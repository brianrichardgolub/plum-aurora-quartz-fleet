import type { ArrestRecord, SourceDocument } from "@/lib/types";

const DB_NAME = "casefile";
const DB_VERSION = 1;

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains("records")) {
        db.createObjectStore("records", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("documents")) {
        db.createObjectStore("documents", { keyPath: "id" });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error ?? new Error("Failed to open Casefile storage"));
  });
}

function reqToPromise<T>(req: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error ?? new Error("IndexedDB request failed"));
  });
}

export async function loadAll(): Promise<{
  records: ArrestRecord[];
  documents: SourceDocument[];
}> {
  const db = await openDb();
  try {
    const records = await reqToPromise(
      db.transaction("records").objectStore("records").getAll(),
    );
    const documents = await reqToPromise(
      db.transaction("documents").objectStore("documents").getAll(),
    );
    return {
      records: (records as ArrestRecord[]).sort((a, b) =>
        (b.arrestedAt ?? b.createdAt).localeCompare(a.arrestedAt ?? a.createdAt),
      ),
      documents: (documents as SourceDocument[]).sort((a, b) =>
        b.uploadedAt.localeCompare(a.uploadedAt),
      ),
    };
  } finally {
    db.close();
  }
}

export async function putRecords(records: ArrestRecord[]): Promise<void> {
  if (records.length === 0) return;
  const db = await openDb();
  try {
    const tx = db.transaction("records", "readwrite");
    const store = tx.objectStore("records");
    await Promise.all(records.map((r) => reqToPromise(store.put(r))));
    await new Promise<void>((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error ?? new Error("Failed to save records"));
    });
  } finally {
    db.close();
  }
}

export async function putDocument(doc: SourceDocument): Promise<void> {
  const db = await openDb();
  try {
    await reqToPromise(db.transaction("documents", "readwrite").objectStore("documents").put(doc));
  } finally {
    db.close();
  }
}

export async function deleteRecord(id: string): Promise<void> {
  const db = await openDb();
  try {
    await reqToPromise(db.transaction("records", "readwrite").objectStore("records").delete(id));
  } finally {
    db.close();
  }
}

export async function deleteDocument(id: string): Promise<void> {
  const db = await openDb();
  try {
    const records = (await reqToPromise(
      db.transaction("records").objectStore("records").getAll(),
    )) as ArrestRecord[];
    const tx = db.transaction(["records", "documents"], "readwrite");
    const recStore = tx.objectStore("records");
    for (const r of records) {
      if (r.sourceId === id) recStore.delete(r.id);
    }
    tx.objectStore("documents").delete(id);
    await new Promise<void>((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error ?? new Error("Failed to delete document"));
    });
  } finally {
    db.close();
  }
}

export async function replaceAll(data: {
  records: ArrestRecord[];
  documents: SourceDocument[];
}): Promise<void> {
  const db = await openDb();
  try {
    const tx = db.transaction(["records", "documents"], "readwrite");
    tx.objectStore("records").clear();
    tx.objectStore("documents").clear();
    for (const r of data.records) tx.objectStore("records").put(r);
    for (const d of data.documents) tx.objectStore("documents").put(d);
    await new Promise<void>((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error ?? new Error("Failed to replace storage"));
    });
  } finally {
    db.close();
  }
}

export async function clearSamples(): Promise<void> {
  const db = await openDb();
  try {
    const records = (await reqToPromise(
      db.transaction("records").objectStore("records").getAll(),
    )) as ArrestRecord[];
    const documents = (await reqToPromise(
      db.transaction("documents").objectStore("documents").getAll(),
    )) as SourceDocument[];
    const tx = db.transaction(["records", "documents"], "readwrite");
    for (const r of records) {
      if (r.isSample) tx.objectStore("records").delete(r.id);
    }
    for (const d of documents) {
      if (d.id.startsWith("sample-")) tx.objectStore("documents").delete(d.id);
    }
    await new Promise<void>((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error ?? new Error("Failed to clear samples"));
    });
  } finally {
    db.close();
  }
}
