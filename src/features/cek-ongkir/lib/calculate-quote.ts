import type { Destination } from "@/types/tarif";
import { CARGO_RULES } from "@/features/cek-ongkir/constants";
import { hasTariff } from "@/features/cek-ongkir/lib/destination";

export type WeightErrorCode = "empty" | "invalid" | "belowMin" | "aboveMax";

export interface WeightError {
  code: WeightErrorCode;
  minWeightKg: number;
}

export type WeightParseResult = { ok: true; weightKg: number } | { ok: false; error: WeightError };

export interface Quote {
  destination: Destination;
  inputWeightKg: number;
  chargeableWeightKg: number;
  pricePerKg: number;
  subtotal: number;
  handlingFee: number;
  total: number;
  isPriced: boolean;
}

export function parseWeight(input: string, minWeightKg: number): WeightParseResult {
  const trimmed = input.trim();
  if (trimmed === "") return { ok: false, error: { code: "empty", minWeightKg } };

  const weightKg = Number(trimmed);
  if (!Number.isFinite(weightKg)) {
    return { ok: false, error: { code: "invalid", minWeightKg } };
  }
  if (weightKg < minWeightKg) {
    return { ok: false, error: { code: "belowMin", minWeightKg } };
  }
  if (weightKg > CARGO_RULES.maximumWeightKg) {
    return { ok: false, error: { code: "aboveMax", minWeightKg } };
  }
  return { ok: true, weightKg };
}

export function calculateQuote(destination: Destination, weightKg: number): Quote {
  const chargeableWeightKg = Math.max(Math.ceil(weightKg), CARGO_RULES.minimumWeightKg);
  const pricePerKg = destination.pricePerKg;
  const isPriced = hasTariff(destination);
  const subtotal = isPriced ? Math.round(pricePerKg * chargeableWeightKg) : 0;
  const handlingFee = CARGO_RULES.handlingFee;

  return {
    destination,
    inputWeightKg: weightKg,
    chargeableWeightKg,
    pricePerKg,
    subtotal,
    handlingFee,
    total: isPriced ? subtotal + handlingFee : 0,
    isPriced,
  };
}
