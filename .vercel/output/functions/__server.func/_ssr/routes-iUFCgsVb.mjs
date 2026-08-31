import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { l as Slot, m as require_jsx_runtime, n as CheckboxIndicator, t as Checkbox$1 } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { a as object, i as number, n as array, o as string, t as _enum } from "../_libs/zod.mjs";
import { a as Plus, c as List, d as FilePlus, f as Download, g as ArrowDown, h as ArrowUp, i as Search, l as LayoutGrid, m as Check, o as Pencil, p as ChevronDown, r as Trash2, s as LoaderCircle, t as X, u as FileUp } from "../_libs/lucide-react.mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { a as Separator2, i as Root2, n as Item2, o as Trigger, r as Portal2, t as Content2 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
import { a as SelectItemIndicator, c as SelectTrigger$1, i as SelectItem$1, l as SelectValue$1, n as SelectContent$1, o as SelectItemText, r as SelectIcon, s as SelectPortal, t as Select$1, u as SelectViewport } from "../_libs/@radix-ui/react-select+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as uid, n as cn, r as initials } from "./router-DGA5_JhZ.mjs";
import { n as format, r as isValid, t as parseISO } from "../_libs/date-fns.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
import { a as Viewport, i as ScrollAreaThumb, n as Root$1, r as ScrollAreaScrollbar, t as Corner } from "../_libs/radix-ui__react-scroll-area.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-iUFCgsVb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function formatArrestDate(iso) {
	if (!iso) return "Date unknown";
	const d = parseISO(iso);
	if (!isValid(d)) return iso;
	return format(d, "MMM d, yyyy");
}
function formatArrestDateTime(iso) {
	if (!iso) return "Date unknown";
	const d = parseISO(iso);
	if (!isValid(d)) return iso;
	return format(d, "MMM d, yyyy · h:mm a");
}
function formatGender(gender) {
	if (gender === "male") return "Male";
	if (gender === "female") return "Female";
	return "Unknown";
}
function toDatetimeLocal(iso) {
	if (!iso) return "";
	const d = parseISO(iso);
	if (!isValid(d)) return "";
	const pad = (n) => String(n).padStart(2, "0");
	return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
function fromDatetimeLocal(value) {
	if (!value) return null;
	const d = new Date(value);
	if (!isValid(d)) return null;
	return d.toISOString();
}
function Portrait({ name, photo, className }) {
	if (photo) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: photo,
		alt: name,
		className: cn("h-full w-full object-cover", className)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex h-full w-full items-center justify-center bg-primary text-primary-foreground", className),
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-serif text-3xl tracking-tight",
			children: initials(name)
		})
	});
}
var badgeVariants = cva("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide", {
	variants: { variant: {
		default: "border-transparent bg-primary text-primary-foreground",
		secondary: "border-transparent bg-secondary text-secondary-foreground",
		outline: "border-border text-foreground",
		muted: "border-transparent bg-muted text-muted-foreground"
	} },
	defaultVariants: { variant: "secondary" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
function ArrestCard({ record, onOpen }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: onOpen,
		className: "group flex flex-col overflow-hidden rounded-xl bg-card text-left shadow-border transition-[box-shadow,transform] duration-150 ease-out hover:shadow-border-hover active:scale-[0.99]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-[4/5] overflow-hidden bg-muted",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portrait, {
				name: record.fullName,
				photo: record.photo
			}), record.isSample && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				className: "absolute left-2 top-2",
				variant: "secondary",
				children: "Sample"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-1 p-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-serif text-lg font-medium leading-snug tracking-tight text-foreground",
					children: record.fullName || "Unnamed"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tabular-nums tracking-wide text-muted-foreground",
					children: record.caseNumber || "No case number"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate text-sm text-foreground/80",
					children: record.retailer || "Retailer unknown"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1 flex items-center justify-between gap-2 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatArrestDate(record.arrestedAt) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatGender(record.gender) })]
				})
			]
		})]
	});
}
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-10 w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground shadow-none transition-[box-shadow,border-color] duration-150 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn("text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className),
	...props
}));
Label.displayName = Root.displayName;
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-24 w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
var Select = Select$1;
var SelectValue = SelectValue$1;
var SelectTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger$1, {
	ref,
	className: cn("flex h-10 w-full items-center justify-between gap-2 rounded-md border border-input bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectIcon, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4 opacity-60" })
	})]
}));
SelectTrigger.displayName = SelectTrigger$1.displayName;
var SelectContent = import_react.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent$1, {
	ref,
	className: cn("relative z-50 max-h-72 min-w-32 overflow-hidden rounded-lg border border-border bg-popover text-popover-foreground shadow-border data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1", className),
	position,
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectViewport, {
		className: cn("p-1", position === "popper" && "w-full min-w-[var(--radix-select-trigger-width)]"),
		children
	})
}) }));
SelectContent.displayName = SelectContent$1.displayName;
var SelectItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem$1, {
	ref,
	className: cn("relative flex w-full cursor-pointer select-none items-center rounded-md py-2 pl-8 pr-2 text-sm outline-none focus:bg-accent data-disabled:pointer-events-none data-disabled:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex size-4 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemText, { children })]
}));
SelectItem.displayName = SelectItem$1.displayName;
function emptyDraft() {
	return {
		fullName: "",
		gender: "unknown",
		caseNumber: "",
		arrestedAt: null,
		retailer: "",
		charges: "",
		location: "",
		notes: "",
		photo: null
	};
}
function RecordForm({ value, onChange }) {
	const set = (patch) => onChange({
		...value,
		...patch
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Name",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: value.fullName,
					onChange: (e) => set({ fullName: e.target.value })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Case number",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						className: "tabular-nums",
						value: value.caseNumber,
						onChange: (e) => set({ caseNumber: e.target.value })
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Gender",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: value.gender,
						onValueChange: (g) => set({ gender: g }),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "male",
								children: "Male"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "female",
								children: "Female"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "unknown",
								children: "Unknown"
							})
						] })]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Arrested",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "datetime-local",
						value: toDatetimeLocal(value.arrestedAt),
						onChange: (e) => set({ arrestedAt: fromDatetimeLocal(e.target.value) })
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Retailer",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: value.retailer,
						onChange: (e) => set({ retailer: e.target.value })
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Charges",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: value.charges,
					onChange: (e) => set({ charges: e.target.value })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Location",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: value.location,
					onChange: (e) => set({ location: e.target.value })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Notes",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: value.notes,
					onChange: (e) => set({ notes: e.target.value }),
					rows: 3
				})
			})
		]
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			className: "text-muted-foreground",
			children: label
		}), children]
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,background-color,box-shadow,transform,opacity] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
			outline: "border border-border bg-card text-foreground hover:bg-accent",
			secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-10 px-4 py-2",
			sm: "h-9 rounded-md px-3",
			lg: "h-11 rounded-md px-5",
			icon: "size-10"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var ScrollArea = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Root$1, {
	ref,
	className: cn("relative overflow-hidden", className),
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Viewport, {
			className: "h-full w-full rounded-[inherit]",
			children
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollBar, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Corner, {})
	]
}));
ScrollArea.displayName = Root$1.displayName;
var ScrollBar = import_react.forwardRef(({ className, orientation = "vertical", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbar, {
	ref,
	orientation,
	className: cn("flex touch-none select-none transition-colors", orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-px", orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-px", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })
}));
ScrollBar.displayName = ScrollAreaScrollbar.displayName;
var Sheet = Dialog$1;
var SheetPortal = DialogPortal$1;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-foreground/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
SheetOverlay.displayName = DialogOverlay$1.displayName;
var SheetContent = import_react.forwardRef(({ className, children, side = "right", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed z-50 flex h-full w-full flex-col bg-card text-card-foreground shadow-border transition ease-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-300", side === "right" && "inset-y-0 right-0 max-w-md data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right", side === "left" && "inset-y-0 left-0 max-w-md data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-3 top-3 rounded-sm p-2 opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
SheetContent.displayName = DialogContent$1.displayName;
function SheetHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-1.5 p-6 pb-0", className),
		...props
	});
}
function SheetFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("mt-auto flex flex-col gap-2 p-6", className),
		...props
	});
}
var SheetTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("pr-8 font-serif text-2xl font-medium tracking-tight", className),
	...props
}));
SheetTitle.displayName = DialogTitle$1.displayName;
var SheetDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
SheetDescription.displayName = DialogDescription$1.displayName;
function ArrestDetail({ record, open, onOpenChange, onSave, onDelete }) {
	const [editing, setEditing] = (0, import_react.useState)(false);
	const [draft, setDraft] = (0, import_react.useState)(emptyDraft());
	(0, import_react.useEffect)(() => {
		if (record) {
			setDraft({
				fullName: record.fullName,
				gender: record.gender,
				caseNumber: record.caseNumber,
				arrestedAt: record.arrestedAt,
				retailer: record.retailer,
				charges: record.charges,
				location: record.location,
				notes: record.notes,
				photo: record.photo
			});
			setEditing(false);
		}
	}, [record]);
	if (!record) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			className: "w-full sm:max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: record.fullName || "Unnamed" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, {
					className: "tabular-nums",
					children: record.caseNumber || "No case number"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
					className: "flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-5 p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "aspect-[4/5] overflow-hidden rounded-lg bg-muted",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portrait, {
									name: record.fullName,
									photo: record.photo
								})
							}),
							record.isSample && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "secondary",
								children: "Sample record"
							}),
							editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecordForm, {
								value: draft,
								onChange: setDraft
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
								className: "grid gap-4 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										label: "Gender",
										value: formatGender(record.gender)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										label: "Arrested",
										value: formatArrestDateTime(record.arrestedAt)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										label: "Retailer",
										value: record.retailer || "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										label: "Charges",
										value: record.charges || "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										label: "Location",
										value: record.location || "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										label: "Source",
										value: record.sourceFileName
									}),
									record.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										label: "Notes",
										value: record.notes
									}) : null
								]
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetFooter, {
					className: "flex-row gap-2 border-t border-border",
					children: editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						className: "flex-1",
						onClick: () => setEditing(false),
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "flex-1",
						onClick: async () => {
							await onSave(record.id, draft);
							setEditing(false);
						},
						children: "Save"
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						className: "flex-1",
						onClick: () => setEditing(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {}), "Edit"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "destructive",
						className: "flex-1",
						onClick: async () => {
							await onDelete(record.id);
							onOpenChange(false);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {}), "Remove"]
					})] })
				})
			]
		})
	});
}
function Row({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
		className: "text-xs uppercase tracking-wider text-muted-foreground",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
		className: "mt-1 text-foreground",
		children: value
	})] });
}
var COLUMNS = [
	{
		key: "fullName",
		label: "Name"
	},
	{
		key: "caseNumber",
		label: "Case",
		className: "hidden sm:table-cell"
	},
	{
		key: "retailer",
		label: "Retailer",
		className: "hidden md:table-cell"
	},
	{
		key: "arrestedAt",
		label: "Arrested"
	}
];
function ArrestTable({ records, sortKey, sortDir, onSort, onOpen }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-hidden rounded-xl bg-card shadow-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[36rem] text-left text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "border-b border-border text-xs uppercase tracking-wider text-muted-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [COLUMNS.map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: cn("px-4 py-3 font-medium", col.className),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "inline-flex items-center gap-1 hover:text-foreground",
							onClick: () => onSort(col.key),
							children: [col.label, sortKey === col.key && (sortDir === "asc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { className: "size-3.5" }))]
						})
					}, col.key)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "hidden px-4 py-3 font-medium lg:table-cell",
						children: "Gender"
					})] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: records.map((record) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "cursor-pointer border-b border-border last:border-0 hover:bg-accent/60",
					onClick: () => onOpen(record.id),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-2.5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "size-10 shrink-0 overflow-hidden rounded-md bg-muted",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portrait, {
										name: record.fullName,
										photo: record.photo
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate font-medium",
										children: record.fullName || "Unnamed"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-xs text-muted-foreground md:hidden",
										children: record.retailer
									})]
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "hidden px-4 py-2.5 tabular-nums text-muted-foreground sm:table-cell",
							children: record.caseNumber || "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "hidden px-4 py-2.5 md:table-cell",
							children: record.retailer || "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-2.5 text-muted-foreground",
							children: formatArrestDateTime(record.arrestedAt)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "hidden px-4 py-2.5 text-muted-foreground lg:table-cell",
							children: formatGender(record.gender)
						})
					]
				}, record.id)) })]
			})
		})
	});
}
function FiltersBar({ filters, retailers, documents, viewMode, sortKey, onFilters, onReset, onViewMode, onSortKey }) {
	const hasActive = filters.query || filters.retailer !== "all" || filters.gender !== "all" || filters.sourceId !== "all" || filters.fromDate || filters.toDate;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: filters.query,
				onChange: (e) => onFilters({ query: e.target.value }),
				placeholder: "Search name, case, store, or charge",
				className: "h-11 rounded-lg pl-10"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-3 lg:flex-row lg:items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2 sm:grid-cols-4 lg:flex lg:flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: filters.retailer,
						onValueChange: (v) => onFilters({ retailer: v }),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "min-h-11 bg-card",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Retailer" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "all",
							children: "All retailers"
						}), retailers.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: r,
							children: r
						}, r))] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: filters.gender,
						onValueChange: (v) => onFilters({ gender: v }),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "min-h-11 bg-card",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Gender" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "all",
								children: "All genders"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "male",
								children: "Male"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "female",
								children: "Female"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "unknown",
								children: "Unknown"
							})
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: filters.sourceId,
						onValueChange: (v) => onFilters({ sourceId: v }),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "min-h-11 bg-card",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Report" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "all",
							children: "All reports"
						}), documents.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: d.id,
							children: d.fileName
						}, d.id))] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: sortKey,
						onValueChange: (v) => onSortKey(v),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "min-h-11 bg-card",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Sort" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "arrestedAt",
								children: "Sort by date"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "fullName",
								children: "Sort by name"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "retailer",
								children: "Sort by retailer"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "caseNumber",
								children: "Sort by case"
							})
						] })]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "date",
						"aria-label": "From date",
						value: filters.fromDate,
						onChange: (e) => onFilters({ fromDate: e.target.value }),
						className: "h-11 min-w-0 flex-1 bg-card lg:w-36 lg:flex-none"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground",
						children: "to"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "date",
						"aria-label": "To date",
						value: filters.toDate,
						onChange: (e) => onFilters({ toDate: e.target.value }),
						className: "h-11 min-w-0 flex-1 bg-card lg:w-36 lg:flex-none"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex rounded-lg bg-muted p-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "Card view",
							onClick: () => onViewMode("cards"),
							className: cn("flex size-9 items-center justify-center rounded-md transition-colors", viewMode === "cards" ? "bg-card text-foreground shadow-border" : "text-muted-foreground"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutGrid, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "Table view",
							onClick: () => onViewMode("table"),
							className: cn("flex size-9 items-center justify-center rounded-md transition-colors", viewMode === "table" ? "bg-card text-foreground shadow-border" : "text-muted-foreground"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { className: "size-4" })
						})]
					}),
					hasActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: onReset,
						"aria-label": "Clear filters",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
					})
				]
			})]
		})]
	});
}
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-foreground/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-1/2 top-1/2 z-50 grid w-[calc(100%-1.5rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-card p-6 text-card-foreground shadow-border duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-3 top-3 rounded-sm p-2 opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-1.5 text-left", className),
		...props
	});
}
function DialogFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
		...props
	});
}
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("font-serif text-xl font-medium leading-snug tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
function ManualRecordDialog({ open, onOpenChange, onSave }) {
	const [draft, setDraft] = (0, import_react.useState)(emptyDraft());
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (next) => {
			if (!next) setDraft(emptyDraft());
			onOpenChange(next);
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-h-[90vh] overflow-y-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Add a record" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Enter an arrest by hand when a report cannot be read." })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecordForm, {
					value: draft,
					onChange: setDraft
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => onOpenChange(false),
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: async () => {
						if (!draft.fullName.trim() && !draft.caseNumber.trim()) {
							toast.error("Add a name or a case number.");
							return;
						}
						const now = (/* @__PURE__ */ new Date()).toISOString();
						await onSave({
							id: uid(),
							...draft,
							sourceFileName: "Manual entry",
							sourceId: "manual",
							createdAt: now
						});
						toast.success("Record added");
						setDraft(emptyDraft());
						onOpenChange(false);
					},
					children: "Save record"
				})] })
			]
		})
	});
}
var MAX_PAGES = 12;
var MAX_MUGSHOTS = 16;
var PAGE_WIDTH = 960;
var MUGSHOT_MIN = 72;
function canvasToJpeg(canvas, quality = .72) {
	return canvas.toDataURL("image/jpeg", quality).split(",")[1] ?? "";
}
function getPageObject(page, name) {
	return new Promise((resolve) => {
		try {
			page.objs.get(name, resolve);
		} catch {
			resolve(null);
		}
	});
}
function imageDataToJpeg(width, height, data) {
	const canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext("2d");
	if (!ctx) return null;
	const imageData = ctx.createImageData(width, height);
	if (data.length === width * height * 4) imageData.data.set(data);
	else if (data.length === width * height * 3) for (let i = 0, j = 0; i < data.length; i += 3, j += 4) {
		imageData.data[j] = data[i];
		imageData.data[j + 1] = data[i + 1];
		imageData.data[j + 2] = data[i + 2];
		imageData.data[j + 3] = 255;
	}
	else if (data.length === width * height) for (let i = 0, j = 0; i < data.length; i += 1, j += 4) {
		const v = data[i];
		imageData.data[j] = v;
		imageData.data[j + 1] = v;
		imageData.data[j + 2] = v;
		imageData.data[j + 3] = 255;
	}
	else return null;
	ctx.putImageData(imageData, 0, 0);
	return canvasToJpeg(canvas, .8);
}
function resizeDataUrl(dataUrl, maxEdge = 360) {
	return new Promise((resolve) => {
		const img = new Image();
		img.onload = () => {
			const scale = Math.min(1, maxEdge / Math.max(img.width, img.height));
			const w = Math.max(1, Math.round(img.width * scale));
			const h = Math.max(1, Math.round(img.height * scale));
			const canvas = document.createElement("canvas");
			canvas.width = w;
			canvas.height = h;
			const ctx = canvas.getContext("2d");
			if (!ctx) {
				resolve(dataUrl);
				return;
			}
			ctx.fillStyle = "#1a1814";
			ctx.fillRect(0, 0, w, h);
			ctx.drawImage(img, 0, 0, w, h);
			resolve(canvas.toDataURL("image/jpeg", .82));
		};
		img.onerror = () => resolve(dataUrl);
		img.src = dataUrl;
	});
}
async function extractPdf(file) {
	const pdfjs = await import("../_libs/pdfjs-dist.mjs").then((n) => n.t);
	const workerUrl = (await import("./pdf.worker.min-rIC0noZo.mjs")).default;
	pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;
	const data = new Uint8Array(await file.arrayBuffer());
	const doc = await pdfjs.getDocument({ data }).promise;
	const pageCount = doc.numPages;
	const pagesToRead = Math.min(pageCount, MAX_PAGES);
	const textParts = [];
	const mugshots = [];
	const pages = [];
	for (let i = 1; i <= pagesToRead; i += 1) {
		const page = await doc.getPage(i);
		const pageText = (await page.getTextContent()).items.map((item) => "str" in item ? item.str : "").join(" ").replace(/\s+/g, " ").trim();
		if (pageText) textParts.push(`--- Page ${i} ---\n${pageText}`);
		try {
			const ops = await page.getOperatorList();
			const seen = /* @__PURE__ */ new Set();
			for (let k = 0; k < ops.fnArray.length; k += 1) {
				if (ops.fnArray[k] !== pdfjs.OPS.paintImageXObject) continue;
				const args = ops.argsArray[k];
				const name = typeof args?.[0] === "string" ? args[0] : void 0;
				if (!name || seen.has(name)) continue;
				seen.add(name);
				try {
					const img = await getPageObject(page, name);
					if (!img?.data || !img.width || !img.height) continue;
					if (img.width < MUGSHOT_MIN || img.height < MUGSHOT_MIN) continue;
					const ratio = img.width / img.height;
					if (ratio > 2.4 || ratio < .35) continue;
					const jpeg = imageDataToJpeg(img.width, img.height, img.data);
					if (!jpeg) continue;
					mugshots.push({
						id: `mug-${i}-${mugshots.length}`,
						mime: "image/jpeg",
						dataBase64: jpeg,
						width: img.width,
						height: img.height,
						kind: "mugshot"
					});
					if (mugshots.length >= MAX_MUGSHOTS) break;
				} catch {}
			}
		} catch {}
		const base = page.getViewport({ scale: 1 });
		const viewport = page.getViewport({ scale: PAGE_WIDTH / base.width });
		const canvas = document.createElement("canvas");
		canvas.width = Math.ceil(viewport.width);
		canvas.height = Math.ceil(viewport.height);
		const ctx = canvas.getContext("2d");
		if (ctx) {
			await page.render({
				canvasContext: ctx,
				viewport
			}).promise;
			pages.push({
				id: `page-${i}`,
				mime: "image/jpeg",
				dataBase64: canvasToJpeg(canvas, .62),
				width: canvas.width,
				height: canvas.height,
				kind: "page"
			});
		}
	}
	const text = textParts.join("\n\n");
	const images = mugshots.length > 0 ? mugshots : pages.slice(0, 8);
	return {
		fileName: file.name,
		pageCount,
		text: text.slice(0, 24e3),
		images
	};
}
function imageToDataUrl(image) {
	return `data:${image.mime};base64,${image.dataBase64}`;
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var imageSchema = object({
	id: string(),
	mime: _enum(["image/jpeg", "image/png"]),
	dataBase64: string().max(9e5),
	width: number(),
	height: number(),
	kind: _enum(["mugshot", "page"])
});
var inputSchema = object({
	fileName: string(),
	pageCount: number(),
	text: string().max(3e4),
	images: array(imageSchema).max(16)
});
var parseArrestReport = createServerFn({ method: "POST" }).validator((input) => inputSchema.parse(input)).handler(createSsrRpc("50d1bb6c986facb34819b7c6ac7af7d5c568288f14b544b214543a24800755dd"));
var Checkbox = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
	ref,
	className: cn("peer size-4 shrink-0 rounded-xs border border-primary shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, {
		className: "flex items-center justify-center text-current",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" })
	})
}));
Checkbox.displayName = Checkbox$1.displayName;
function UploadDialog({ open, onOpenChange, existingCaseNumbers, hasSamples, onCommit }) {
	const inputRef = (0, import_react.useRef)(null);
	const [stage, setStage] = (0, import_react.useState)("idle");
	const [status, setStatus] = (0, import_react.useState)("Reading PDF");
	const [error, setError] = (0, import_react.useState)(null);
	const [extracted, setExtracted] = (0, import_react.useState)(null);
	const [rows, setRows] = (0, import_react.useState)([]);
	const [dropSamples, setDropSamples] = (0, import_react.useState)(true);
	const [dragOver, setDragOver] = (0, import_react.useState)(false);
	const reset = () => {
		setStage("idle");
		setStatus("Reading PDF");
		setError(null);
		setExtracted(null);
		setRows([]);
		setDropSamples(true);
	};
	const handleFiles = async (files) => {
		const file = Array.from(files).find((f) => f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf"));
		if (!file) {
			setError("Please choose a PDF report.");
			return;
		}
		setError(null);
		setStage("working");
		setStatus("Reading pages and photos");
		try {
			const pdf = await extractPdf(file);
			setExtracted(pdf);
			setStatus("Identifying arrests");
			const result = await parseArrestReport({ data: {
				fileName: pdf.fileName,
				pageCount: pdf.pageCount,
				text: pdf.text,
				images: pdf.images
			} });
			if (!result.ok) {
				setError(result.error);
				setStage("manual");
				return;
			}
			const next = [];
			for (const rec of result.records) {
				let photo = null;
				if (rec.photoIndex != null && pdf.images[rec.photoIndex]) photo = await resizeDataUrl(imageToDataUrl(pdf.images[rec.photoIndex]));
				const caseKey = rec.caseNumber.trim().toLowerCase();
				next.push({
					...rec,
					included: true,
					photo,
					duplicate: Boolean(caseKey) && existingCaseNumbers.has(caseKey)
				});
			}
			setRows(next);
			setStage("review");
		} catch (err) {
			setError(err instanceof Error ? err.message : "Could not read this PDF.");
			setStage("idle");
		}
	};
	const commit = async () => {
		if (!extracted) return;
		const selected = rows.filter((r) => r.included);
		if (selected.length === 0) {
			toast.error("Select at least one record to add.");
			return;
		}
		const sourceId = uid();
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const doc = {
			id: sourceId,
			fileName: extracted.fileName,
			uploadedAt: now,
			recordCount: selected.length,
			pageCount: extracted.pageCount
		};
		const records = selected.map((r) => ({
			id: uid(),
			fullName: r.fullName,
			gender: r.gender,
			caseNumber: r.caseNumber,
			arrestedAt: r.arrestedAt,
			retailer: r.retailer,
			charges: r.charges,
			location: r.location,
			notes: r.notes,
			photo: r.photo,
			sourceFileName: extracted.fileName,
			sourceId,
			createdAt: now
		}));
		await onCommit([doc], records, hasSamples && dropSamples);
		toast.success(`Added ${records.length} ${records.length === 1 ? "record" : "records"}`);
		reset();
		onOpenChange(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (next) => {
			if (!next) reset();
			onOpenChange(next);
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-h-[90vh] max-w-2xl overflow-hidden p-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-6 pb-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Upload a report" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Drop one PDF. Casefile reads names, photos, case numbers, dates, retailers, and gender." })] })
				}),
				stage === "idle" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: inputRef,
							type: "file",
							accept: "application/pdf,.pdf",
							className: "hidden",
							onChange: (e) => {
								if (e.target.files) handleFiles(e.target.files);
								e.target.value = "";
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => inputRef.current?.click(),
							onDragOver: (e) => {
								e.preventDefault();
								setDragOver(true);
							},
							onDragLeave: () => setDragOver(false),
							onDrop: (e) => {
								e.preventDefault();
								setDragOver(false);
								handleFiles(e.dataTransfer.files);
							},
							className: `flex min-h-48 w-full flex-col items-center justify-center gap-3 rounded-lg border border-dashed px-6 py-10 text-center transition-colors ${dragOver ? "border-primary bg-accent" : "border-border bg-muted/40 hover:bg-accent"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUp, { className: "size-8 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: "Drop a PDF here"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "or click to choose a file"
							})] })]
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-destructive",
							children: error
						})
					]
				}),
				stage === "working" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-h-48 flex-col items-center justify-center gap-3 p-10 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-8 animate-spin text-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: status
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "This stays on your device until the extract step."
						})
					]
				}),
				stage === "manual" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-destructive",
							children: error
						}),
						extracted?.text ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
							className: "h-48 rounded-lg border border-border bg-muted/40 p-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
								className: "whitespace-pre-wrap font-sans text-xs text-muted-foreground",
								children: extracted.text.slice(0, 4e3)
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "No selectable text was found. You can still add people with Add record after closing this."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: reset,
							children: "Try another file"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => {
								reset();
								onOpenChange(false);
							},
							children: "Close"
						})] })
					]
				}),
				stage === "review" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex max-h-[70vh] flex-col",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "px-6 text-sm text-muted-foreground",
							children: [
								rows.length,
								" ",
								rows.length === 1 ? "person" : "people",
								" found in ",
								extracted?.fileName,
								". Uncheck anyone you do not want to keep."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
							className: "mt-3 max-h-[46vh] px-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "space-y-2 pb-2",
								children: rows.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center gap-3 rounded-lg border border-border bg-card p-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
											checked: row.included,
											onCheckedChange: (v) => setRows((prev) => prev.map((r, idx) => idx === i ? {
												...r,
												included: v === true
											} : r)),
											className: "ml-1"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "size-14 shrink-0 overflow-hidden rounded-md bg-muted",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portrait, {
												name: row.fullName,
												photo: row.photo
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0 flex-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex flex-wrap items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "truncate font-medium",
														children: row.fullName || "Unnamed"
													}), row.duplicate && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
														variant: "outline",
														children: "Already on file"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "truncate text-xs tabular-nums text-muted-foreground",
													children: [
														row.caseNumber || "No case number",
														" · ",
														formatGender(row.gender)
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "truncate text-sm text-muted-foreground",
													children: [
														row.retailer || "Retailer unknown",
														" · ",
														formatArrestDate(row.arrestedAt)
													]
												})
											]
										})
									]
								}, `${row.caseNumber}-${i}`))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 border-t border-border p-6",
							children: [hasSamples && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
									checked: dropSamples,
									onCheckedChange: (v) => setDropSamples(v === true)
								}), "Remove sample records when adding these"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: reset,
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: () => void commit(),
								children: [
									"Add ",
									rows.filter((r) => r.included).length,
									" to Casefile"
								]
							})] })]
						})
					]
				})
			]
		})
	});
}
var DropdownMenu = Root2;
var DropdownMenuTrigger = Trigger;
var DropdownMenuContent = import_react.forwardRef(({ className, sideOffset = 6, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	sideOffset,
	className: cn("z-50 min-w-40 overflow-hidden rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-border data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", className),
	...props
}) }));
DropdownMenuContent.displayName = Content2.displayName;
var DropdownMenuItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
	ref,
	className: cn("relative flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-2 text-sm outline-none transition-colors focus:bg-accent data-disabled:pointer-events-none data-disabled:opacity-50", className),
	...props
}));
DropdownMenuItem.displayName = Item2.displayName;
var DropdownMenuSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator2, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-border", className),
	...props
}));
DropdownMenuSeparator.displayName = Separator2.displayName;
function csvEscape(value) {
	if (/[",\n]/.test(value)) return `"${value.replaceAll("\"", "\"\"")}"`;
	return value;
}
function recordsToCsv(records) {
	const header = [
		"Name",
		"Gender",
		"Case number",
		"Arrested",
		"Retailer",
		"Charges",
		"Location",
		"Notes",
		"Source file"
	];
	const rows = records.map((r) => [
		r.fullName,
		formatGender(r.gender),
		r.caseNumber,
		formatArrestDateTime(r.arrestedAt),
		r.retailer,
		r.charges,
		r.location,
		r.notes,
		r.sourceFileName
	].map(csvEscape).join(","));
	return [header.join(","), ...rows].join("\n");
}
function downloadText(filename, contents, mime) {
	const blob = new Blob([contents], { type: mime });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.click();
	URL.revokeObjectURL(url);
}
var DB_NAME = "casefile";
var DB_VERSION = 1;
function openDb() {
	return new Promise((resolve, reject) => {
		const req = indexedDB.open(DB_NAME, DB_VERSION);
		req.onupgradeneeded = () => {
			const db = req.result;
			if (!db.objectStoreNames.contains("records")) db.createObjectStore("records", { keyPath: "id" });
			if (!db.objectStoreNames.contains("documents")) db.createObjectStore("documents", { keyPath: "id" });
		};
		req.onsuccess = () => resolve(req.result);
		req.onerror = () => reject(req.error ?? /* @__PURE__ */ new Error("Failed to open Casefile storage"));
	});
}
function reqToPromise(req) {
	return new Promise((resolve, reject) => {
		req.onsuccess = () => resolve(req.result);
		req.onerror = () => reject(req.error ?? /* @__PURE__ */ new Error("IndexedDB request failed"));
	});
}
async function loadAll() {
	const db = await openDb();
	try {
		const records = await reqToPromise(db.transaction("records").objectStore("records").getAll());
		const documents = await reqToPromise(db.transaction("documents").objectStore("documents").getAll());
		return {
			records: records.sort((a, b) => (b.arrestedAt ?? b.createdAt).localeCompare(a.arrestedAt ?? a.createdAt)),
			documents: documents.sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt))
		};
	} finally {
		db.close();
	}
}
async function putRecords(records) {
	if (records.length === 0) return;
	const db = await openDb();
	try {
		const tx = db.transaction("records", "readwrite");
		const store = tx.objectStore("records");
		await Promise.all(records.map((r) => reqToPromise(store.put(r))));
		await new Promise((resolve, reject) => {
			tx.oncomplete = () => resolve();
			tx.onerror = () => reject(tx.error ?? /* @__PURE__ */ new Error("Failed to save records"));
		});
	} finally {
		db.close();
	}
}
async function putDocument(doc) {
	const db = await openDb();
	try {
		await reqToPromise(db.transaction("documents", "readwrite").objectStore("documents").put(doc));
	} finally {
		db.close();
	}
}
async function deleteRecord(id) {
	const db = await openDb();
	try {
		await reqToPromise(db.transaction("records", "readwrite").objectStore("records").delete(id));
	} finally {
		db.close();
	}
}
async function deleteDocument(id) {
	const db = await openDb();
	try {
		const records = await reqToPromise(db.transaction("records").objectStore("records").getAll());
		const tx = db.transaction(["records", "documents"], "readwrite");
		const recStore = tx.objectStore("records");
		for (const r of records) if (r.sourceId === id) recStore.delete(r.id);
		tx.objectStore("documents").delete(id);
		await new Promise((resolve, reject) => {
			tx.oncomplete = () => resolve();
			tx.onerror = () => reject(tx.error ?? /* @__PURE__ */ new Error("Failed to delete document"));
		});
	} finally {
		db.close();
	}
}
async function replaceAll(data) {
	const db = await openDb();
	try {
		const tx = db.transaction(["records", "documents"], "readwrite");
		tx.objectStore("records").clear();
		tx.objectStore("documents").clear();
		for (const r of data.records) tx.objectStore("records").put(r);
		for (const d of data.documents) tx.objectStore("documents").put(d);
		await new Promise((resolve, reject) => {
			tx.oncomplete = () => resolve();
			tx.onerror = () => reject(tx.error ?? /* @__PURE__ */ new Error("Failed to replace storage"));
		});
	} finally {
		db.close();
	}
}
async function clearSamples() {
	const db = await openDb();
	try {
		const records = await reqToPromise(db.transaction("records").objectStore("records").getAll());
		const documents = await reqToPromise(db.transaction("documents").objectStore("documents").getAll());
		const tx = db.transaction(["records", "documents"], "readwrite");
		for (const r of records) if (r.isSample) tx.objectStore("records").delete(r.id);
		for (const d of documents) if (d.id.startsWith("sample-")) tx.objectStore("documents").delete(d.id);
		await new Promise((resolve, reject) => {
			tx.oncomplete = () => resolve();
			tx.onerror = () => reject(tx.error ?? /* @__PURE__ */ new Error("Failed to clear samples"));
		});
	} finally {
		db.close();
	}
}
function avatar(name, ink) {
	const parts = name.trim().split(/\s+/);
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="400" viewBox="0 0 320 400">
  <rect width="320" height="400" fill="${ink}"/>
  <circle cx="160" cy="168" r="64" fill="#f4efe6" opacity="0.14"/>
  <text x="160" y="184" text-anchor="middle" font-family="Georgia, serif" font-size="64" fill="#f4efe6">${parts.length === 1 ? parts[0].slice(0, 2).toUpperCase() : `${parts[0][0] ?? ""}${parts[parts.length - 1][0] ?? ""}`.toUpperCase()}</text>
  <rect x="0" y="372" width="320" height="28" fill="#1a1814" opacity="0.35"/>
</svg>`;
	return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
var SAMPLE_DOC_ID = "sample-bulletin-aug";
var SAMPLE_DOCUMENT = {
	id: SAMPLE_DOC_ID,
	fileName: "sample-weekly-bulletin.pdf",
	uploadedAt: "2026-08-24T14:00:00.000Z",
	recordCount: 12,
	pageCount: 4
};
var SAMPLE_RECORDS = [
	{
		id: "sample-1",
		fullName: "Marcus Hale",
		gender: "male",
		caseNumber: "PD-26-18421",
		arrestedAt: "2026-08-22T16:42:00.000Z",
		retailer: "Harbor & Oak Market",
		charges: "Shoplifting",
		location: "Harbor & Oak Market, 410 Pine St",
		notes: "",
		photo: avatar("Marcus Hale", "#243447"),
		sourceFileName: SAMPLE_DOCUMENT.fileName,
		sourceId: SAMPLE_DOC_ID,
		createdAt: "2026-08-24T14:00:00.000Z",
		isSample: true
	},
	{
		id: "sample-2",
		fullName: "Elena Voss",
		gender: "female",
		caseNumber: "PD-26-18455",
		arrestedAt: "2026-08-21T11:18:00.000Z",
		retailer: "Northline Pharmacy",
		charges: "Theft of controlled merchandise",
		location: "Northline Pharmacy #18",
		notes: "",
		photo: avatar("Elena Voss", "#3d4a3a"),
		sourceFileName: SAMPLE_DOCUMENT.fileName,
		sourceId: SAMPLE_DOC_ID,
		createdAt: "2026-08-24T14:00:00.000Z",
		isSample: true
	},
	{
		id: "sample-3",
		fullName: "Jonah Reed",
		gender: "male",
		caseNumber: "PD-26-18302",
		arrestedAt: "2026-08-19T19:05:00.000Z",
		retailer: "Westfield Supercenter",
		charges: "Organized retail theft",
		location: "Westfield Supercenter, Bay 4",
		notes: "",
		photo: avatar("Jonah Reed", "#4a3b32"),
		sourceFileName: SAMPLE_DOCUMENT.fileName,
		sourceId: SAMPLE_DOC_ID,
		createdAt: "2026-08-24T14:00:00.000Z",
		isSample: true
	},
	{
		id: "sample-4",
		fullName: "Priya Nandakumar",
		gender: "female",
		caseNumber: "PD-26-18277",
		arrestedAt: "2026-08-18T13:27:00.000Z",
		retailer: "Lumen Home Goods",
		charges: "Shoplifting",
		location: "Lumen Home Goods — Riverside",
		notes: "",
		photo: avatar("Priya Nandakumar", "#2f3d4d"),
		sourceFileName: SAMPLE_DOCUMENT.fileName,
		sourceId: SAMPLE_DOC_ID,
		createdAt: "2026-08-24T14:00:00.000Z",
		isSample: true
	},
	{
		id: "sample-5",
		fullName: "Derrick Cole",
		gender: "male",
		caseNumber: "PD-26-18190",
		arrestedAt: "2026-08-16T09:51:00.000Z",
		retailer: "Westfield Supercenter",
		charges: "Trespass after warning",
		location: "Westfield Supercenter, grocery",
		notes: "",
		photo: avatar("Derrick Cole", "#3a3330"),
		sourceFileName: SAMPLE_DOCUMENT.fileName,
		sourceId: SAMPLE_DOC_ID,
		createdAt: "2026-08-24T14:00:00.000Z",
		isSample: true
	},
	{
		id: "sample-6",
		fullName: "Sofia Alvarez",
		gender: "female",
		caseNumber: "PD-26-18144",
		arrestedAt: "2026-08-15T17:33:00.000Z",
		retailer: "Harbor & Oak Market",
		charges: "Shoplifting",
		location: "Harbor & Oak Market, 410 Pine St",
		notes: "",
		photo: avatar("Sofia Alvarez", "#4a3944"),
		sourceFileName: SAMPLE_DOCUMENT.fileName,
		sourceId: SAMPLE_DOC_ID,
		createdAt: "2026-08-24T14:00:00.000Z",
		isSample: true
	},
	{
		id: "sample-7",
		fullName: "Theo Brandt",
		gender: "male",
		caseNumber: "PD-26-18088",
		arrestedAt: "2026-08-12T20:14:00.000Z",
		retailer: "Cinder Hardware",
		charges: "Theft",
		location: "Cinder Hardware, Dockside",
		notes: "",
		photo: avatar("Theo Brandt", "#2c3a32"),
		sourceFileName: SAMPLE_DOCUMENT.fileName,
		sourceId: SAMPLE_DOC_ID,
		createdAt: "2026-08-24T14:00:00.000Z",
		isSample: true
	},
	{
		id: "sample-8",
		fullName: "Amelia Cho",
		gender: "female",
		caseNumber: "PD-26-18021",
		arrestedAt: "2026-08-11T12:02:00.000Z",
		retailer: "Northline Pharmacy",
		charges: "Shoplifting",
		location: "Northline Pharmacy #18",
		notes: "",
		photo: avatar("Amelia Cho", "#243447"),
		sourceFileName: SAMPLE_DOCUMENT.fileName,
		sourceId: SAMPLE_DOC_ID,
		createdAt: "2026-08-24T14:00:00.000Z",
		isSample: true
	},
	{
		id: "sample-9",
		fullName: "Isaac Morrow",
		gender: "male",
		caseNumber: "PD-26-17960",
		arrestedAt: "2026-08-08T15:47:00.000Z",
		retailer: "Lumen Home Goods",
		charges: "Fraudulent return",
		location: "Lumen Home Goods — Riverside",
		notes: "",
		photo: avatar("Isaac Morrow", "#3d4a3a"),
		sourceFileName: SAMPLE_DOCUMENT.fileName,
		sourceId: SAMPLE_DOC_ID,
		createdAt: "2026-08-24T14:00:00.000Z",
		isSample: true
	},
	{
		id: "sample-10",
		fullName: "Nina Patel",
		gender: "female",
		caseNumber: "PD-26-17895",
		arrestedAt: "2026-08-05T10:19:00.000Z",
		retailer: "Westfield Supercenter",
		charges: "Shoplifting",
		location: "Westfield Supercenter, apparel",
		notes: "",
		photo: avatar("Nina Patel", "#4a3b32"),
		sourceFileName: SAMPLE_DOCUMENT.fileName,
		sourceId: SAMPLE_DOC_ID,
		createdAt: "2026-08-24T14:00:00.000Z",
		isSample: true
	},
	{
		id: "sample-11",
		fullName: "Calvin Ortiz",
		gender: "male",
		caseNumber: "PD-26-17740",
		arrestedAt: "2026-07-29T18:08:00.000Z",
		retailer: "Cinder Hardware",
		charges: "Theft of tools",
		location: "Cinder Hardware, Dockside",
		notes: "",
		photo: avatar("Calvin Ortiz", "#2f3d4d"),
		sourceFileName: SAMPLE_DOCUMENT.fileName,
		sourceId: SAMPLE_DOC_ID,
		createdAt: "2026-08-24T14:00:00.000Z",
		isSample: true
	},
	{
		id: "sample-12",
		fullName: "Harper Quinn",
		gender: "unknown",
		caseNumber: "PD-26-17612",
		arrestedAt: "2026-07-22T14:55:00.000Z",
		retailer: "Harbor & Oak Market",
		charges: "Shoplifting",
		location: "Harbor & Oak Market, 410 Pine St",
		notes: "Sex not listed on the source bulletin.",
		photo: avatar("Harper Quinn", "#3a3330"),
		sourceFileName: SAMPLE_DOCUMENT.fileName,
		sourceId: SAMPLE_DOC_ID,
		createdAt: "2026-08-24T14:00:00.000Z",
		isSample: true
	}
];
var EMPTY_FILTERS = {
	query: "",
	retailer: "all",
	gender: "all",
	sourceId: "all",
	fromDate: "",
	toDate: ""
};
function matches(record, filters) {
	const q = filters.query.trim().toLowerCase();
	if (q) {
		if (![
			record.fullName,
			record.caseNumber,
			record.retailer,
			record.charges,
			record.location,
			record.notes
		].join(" ").toLowerCase().includes(q)) return false;
	}
	if (filters.retailer !== "all" && record.retailer !== filters.retailer) return false;
	if (filters.gender !== "all" && record.gender !== filters.gender) return false;
	if (filters.sourceId !== "all" && record.sourceId !== filters.sourceId) return false;
	if (filters.fromDate) {
		const from = `${filters.fromDate}T00:00:00.000Z`;
		if ((record.arrestedAt ?? "") < from) return false;
	}
	if (filters.toDate) {
		const to = `${filters.toDate}T23:59:59.999Z`;
		if ((record.arrestedAt ?? "") > to) return false;
	}
	return true;
}
function filterRecords(records, filters, sortKey, sortDir) {
	const next = records.filter((r) => matches(r, filters));
	next.sort((a, b) => {
		const av = a[sortKey] ?? "";
		const bv = b[sortKey] ?? "";
		const cmp = String(av).localeCompare(String(bv), void 0, { sensitivity: "base" });
		return sortDir === "asc" ? cmp : -cmp;
	});
	return next;
}
var useCasefile = create((set, get) => ({
	ready: false,
	records: [],
	documents: [],
	filters: EMPTY_FILTERS,
	sortKey: "arrestedAt",
	sortDir: "desc",
	viewMode: "cards",
	selectedId: null,
	hydrate: async () => {
		const data = await loadAll();
		if (data.records.length === 0 && data.documents.length === 0) {
			await replaceAll({
				records: SAMPLE_RECORDS,
				documents: [SAMPLE_DOCUMENT]
			});
			set({
				ready: true,
				records: SAMPLE_RECORDS,
				documents: [SAMPLE_DOCUMENT]
			});
			return;
		}
		set({
			ready: true,
			records: data.records,
			documents: data.documents
		});
	},
	setFilters: (patch) => set({ filters: {
		...get().filters,
		...patch
	} }),
	resetFilters: () => set({ filters: EMPTY_FILTERS }),
	setSort: (key) => {
		const { sortKey, sortDir } = get();
		if (sortKey === key) set({ sortDir: sortDir === "asc" ? "desc" : "asc" });
		else set({
			sortKey: key,
			sortDir: key === "fullName" || key === "retailer" ? "asc" : "desc"
		});
	},
	setViewMode: (mode) => set({ viewMode: mode }),
	setSelectedId: (id) => set({ selectedId: id }),
	addBatch: async (docs, records, dropSamples) => {
		let nextRecords = get().records;
		let nextDocs = get().documents;
		if (dropSamples) {
			await clearSamples();
			nextRecords = nextRecords.filter((r) => !r.isSample);
			nextDocs = nextDocs.filter((d) => !d.id.startsWith("sample-"));
		}
		nextRecords = [...records, ...nextRecords];
		nextDocs = [...docs, ...nextDocs];
		await putRecords(records);
		for (const d of docs) await putDocument(d);
		set({
			records: nextRecords,
			documents: nextDocs
		});
	},
	updateRecord: async (id, patch) => {
		const records = get().records.map((r) => r.id === id ? {
			...r,
			...patch
		} : r);
		const updated = records.find((r) => r.id === id);
		if (updated) await putRecords([updated]);
		set({ records });
	},
	removeRecord: async (id) => {
		await deleteRecord(id);
		set({
			records: get().records.filter((r) => r.id !== id),
			selectedId: get().selectedId === id ? null : get().selectedId
		});
	},
	removeDocument: async (id) => {
		await deleteDocument(id);
		set({
			records: get().records.filter((r) => r.sourceId !== id),
			documents: get().documents.filter((d) => d.id !== id),
			selectedId: get().records.find((r) => r.id === get().selectedId)?.sourceId === id ? null : get().selectedId
		});
	},
	clearSamples: async () => {
		await clearSamples();
		set({
			records: get().records.filter((r) => !r.isSample),
			documents: get().documents.filter((d) => !d.id.startsWith("sample-"))
		});
	}
}));
function Home() {
	const ready = useCasefile((s) => s.ready);
	const records = useCasefile((s) => s.records);
	const documents = useCasefile((s) => s.documents);
	const filters = useCasefile((s) => s.filters);
	const sortKey = useCasefile((s) => s.sortKey);
	const sortDir = useCasefile((s) => s.sortDir);
	const viewMode = useCasefile((s) => s.viewMode);
	const selectedId = useCasefile((s) => s.selectedId);
	const hydrate = useCasefile((s) => s.hydrate);
	const setFilters = useCasefile((s) => s.setFilters);
	const resetFilters = useCasefile((s) => s.resetFilters);
	const setSort = useCasefile((s) => s.setSort);
	const setViewMode = useCasefile((s) => s.setViewMode);
	const setSelectedId = useCasefile((s) => s.setSelectedId);
	const addBatch = useCasefile((s) => s.addBatch);
	const updateRecord = useCasefile((s) => s.updateRecord);
	const removeRecord = useCasefile((s) => s.removeRecord);
	const clearSamples = useCasefile((s) => s.clearSamples);
	const [uploadOpen, setUploadOpen] = (0, import_react.useState)(false);
	const [manualOpen, setManualOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		hydrate();
	}, [hydrate]);
	const visible = (0, import_react.useMemo)(() => filterRecords(records, filters, sortKey, sortDir), [
		records,
		filters,
		sortKey,
		sortDir
	]);
	const retailers = (0, import_react.useMemo)(() => {
		return [...new Set(records.map((r) => r.retailer).filter(Boolean))].sort((a, b) => a.localeCompare(b));
	}, [records]);
	const selected = records.find((r) => r.id === selectedId) ?? null;
	const sampleCount = records.filter((r) => r.isSample).length;
	const caseNumbers = (0, import_react.useMemo)(() => {
		const set = /* @__PURE__ */ new Set();
		for (const r of records) if (r.caseNumber) set.add(r.caseNumber.trim().toLowerCase());
		return set;
	}, [records]);
	const male = records.filter((r) => r.gender === "male").length;
	const female = records.filter((r) => r.gender === "female").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none fixed inset-y-0 left-0 w-1.5 bg-rule",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "border-b border-border/80",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground",
								children: "Local case desk"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-1 font-serif text-4xl font-medium tracking-tight text-foreground sm:text-5xl",
								children: "Casefile"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 max-w-xl text-sm text-muted-foreground sm:text-base",
								children: "Upload arrest bulletins one at a time. Search the compiled file by name, retailer, date, or gender. Records stay on this device."
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									onClick: () => setManualOpen(true),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), "Add record"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "outline",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {}), "Export"]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
									align: "end",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
											onClick: () => downloadText("casefile.csv", recordsToCsv(visible), "text/csv;charset=utf-8"),
											children: "Download CSV"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
											onClick: () => downloadText("casefile.json", JSON.stringify(stripPhotos(visible), null, 2), "application/json"),
											children: "Download JSON"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
										sampleCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
											onClick: () => void clearSamples(),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }), "Remove sample records"]
										})
									]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									onClick: () => setUploadOpen(true),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePlus, {}), "Upload report"]
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "On file",
								value: records.length
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Retailers",
								value: retailers.length
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Male / Female",
								value: `${male} / ${female}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Reports",
								value: documents.length
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiltersBar, {
						filters,
						retailers,
						documents,
						viewMode,
						sortKey,
						onFilters: setFilters,
						onReset: resetFilters,
						onViewMode: setViewMode,
						onSortKey: (key) => {
							if (sortKey === key) setSort(key);
							else useCasefile.setState({
								sortKey: key,
								sortDir: key === "fullName" || key === "retailer" ? "asc" : "desc"
							});
						}
					}),
					!ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4",
						children: Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "aspect-[3/4] animate-pulse rounded-xl bg-muted" }, i))
					}) : visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						onUpload: () => setUploadOpen(true),
						onManual: () => setManualOpen(true)
					}) : viewMode === "cards" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4",
						children: visible.map((record) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrestCard, {
							record,
							onOpen: () => setSelectedId(record.id)
						}, record.id))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrestTable, {
							records: visible,
							sortKey,
							sortDir,
							onSort: setSort,
							onOpen: setSelectedId
						})
					}),
					ready && visible.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-6 text-center text-sm tabular-nums text-muted-foreground",
						children: [
							"Showing ",
							visible.length,
							" of ",
							records.length
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrestDetail, {
				record: selected,
				open: Boolean(selected),
				onOpenChange: (open) => {
					if (!open) setSelectedId(null);
				},
				onSave: updateRecord,
				onDelete: async (id) => {
					await removeRecord(id);
					toast.success("Record removed");
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UploadDialog, {
				open: uploadOpen,
				onOpenChange: setUploadOpen,
				existingCaseNumbers: caseNumbers,
				hasSamples: sampleCount > 0,
				onCommit: addBatch
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ManualRecordDialog, {
				open: manualOpen,
				onOpenChange: setManualOpen,
				onSave: async (record) => {
					await addBatch(record.sourceId === "manual" && !documents.some((d) => d.id === "manual") ? [{
						id: "manual",
						fileName: "Manual entry",
						uploadedAt: record.createdAt,
						recordCount: 1,
						pageCount: 0
					}] : [], [record], false);
				}
			})
		]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-card px-4 py-3 shadow-border",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-xs uppercase tracking-wider text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "mt-1 font-serif text-2xl tabular-nums tracking-tight",
			children: value
		})]
	});
}
function EmptyState({ onUpload, onManual }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-10 rounded-xl bg-card px-6 py-16 text-center shadow-border",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-serif text-2xl font-medium",
				children: "No matching records"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto mt-2 max-w-md text-sm text-muted-foreground",
				children: "Adjust the filters, upload another bulletin, or add someone by hand."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-wrap justify-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: onUpload,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePlus, {}), "Upload report"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					onClick: onManual,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), "Add record"]
				})]
			})
		]
	});
}
function stripPhotos(records) {
	return records.map(({ photo: _photo, ...rest }) => rest);
}
//#endregion
export { Home as component };
