"use client";

import { useEffect, useState } from "react";

export default function UserModal({
  open,
  title,
  submitText,
  defaultValues,
  readOnly,
  onClose,
  onSubmit,
}: {
  open: boolean;
  title: string;
  submitText: string;
  defaultValues: { name: string; email: string; mobile: string ,password?: string};
  readOnly?: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    email: string;
    mobile: string;
    password?: string;
  }) => void;
}) {
  const [form, setForm] = useState({
    name: defaultValues.name,
    email: defaultValues.email,
    mobile: defaultValues.mobile,
    password: defaultValues.password || "",
  });

  useEffect(() => {
    setForm({
      name: defaultValues.name,
      email: defaultValues.email,
      mobile: defaultValues.mobile,
      password: defaultValues.password || "",
    });
  }, [defaultValues]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute left-1/2 top-1/2 w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-5 shadow-xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="mt-1 text-sm text-slate-600">
              {readOnly ? "View user info" : "Fill the fields below"}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50"
          >
            ✕
          </button>
        </div>

        <div className="mt-4 grid gap-3">
          <Field label="Name">
            <input
              defaultValue={form.name}
              disabled={readOnly}
              name="name"
              type="text"
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none disabled:bg-slate-50"
              placeholder="Your Name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </Field>

          <Field label="Email">
            <input
              defaultValue={form.email}
              disabled={readOnly}
              name="email"
              type="email"
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none disabled:bg-slate-50"
              placeholder="Your Email "
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </Field>

          <Field label="Mobile">
            <input
              defaultValue={form.mobile}
              disabled={readOnly}
              name="mobile"
              type="text"
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none disabled:bg-slate-50"
              placeholder="Your phone number"
              onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            />
          </Field>

          {!readOnly && (
            <Field label="Password">
              <input
                disabled={readOnly}
                defaultValue={form.password}
                name="password"
                type="password"
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none disabled:bg-slate-50"
                placeholder="**********"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              
              />
            </Field>
          )}
        </div>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmit(form)}
            className="h-11 rounded-xl bg-slate-900 px-4 text-sm font-medium text-white hover:bg-slate-800"
          >
            {submitText}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-1">
      <span className="text-xs font-medium text-slate-600">{label}</span>
      {children}
    </label>
  );
}
