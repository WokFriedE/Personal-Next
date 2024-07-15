"use client";
// export { toast } from "react-toastify";
import { toast } from "react-toastify";

export function toastMsg(msg, type = "info") {
    toast(msg, { autoClose: 3000, type: type });
}
