import { shippingConfig } from "@/config/shipping";

export const COMPANY_NAME = "Lion Cargo Logistik";

export const CARGO_RULES = {
  minimumWeightKg: shippingConfig.minWeightKg,
  maximumWeightKg: 100_000,
  handlingFee: shippingConfig.adminFee,
  estimatedTransit: shippingConfig.estimasiReguler,
} as const;

export const DESTINATIONS_PER_PAGE = 15;
