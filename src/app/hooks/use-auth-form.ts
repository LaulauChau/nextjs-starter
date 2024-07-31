"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type FormEvent, useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { loginAction } from "~/app/actions/auth/login.action";
import { registerAction } from "~/app/actions/auth/register.action";
import {
  type LoginSchema,
  loginSchema,
} from "~/app/validations/auth/login.schema";
import {
  type RegisterSchema,
  registerSchema,
} from "~/app/validations/auth/register.schema";

export function useAuthForm(formType: "login" | "register") {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(
    formType === "login" ? loginAction : registerAction,
    {
      message: "",
    },
  );
  const form = useForm<
    typeof formType extends "login" ? LoginSchema : RegisterSchema
  >({
    defaultValues: {
      name: "",
      username: "",
      password: "",
      confirmPassword: "",
      ...(state?.fields ?? {}),
    },
    resolver: zodResolver(formType === "login" ? loginSchema : registerSchema),
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    form.handleSubmit(() => {
      if (formRef.current) {
        formAction(new FormData(formRef.current));
      }
    })(event);
  }

  useEffect(() => {
    if (state.message) {
      toast.error(state.message);
    }

    console.log({ state });
  }, [state]);

  return {
    form,
    formAction,
    formRef,
    onSubmit: handleSubmit,
  };
}
