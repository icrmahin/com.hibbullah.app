import StatusBadge from "../common/StatusBadge";
import type { InventoryStatus as InventoryStatusValue } from "../../types/inventory";

export default function InventoryStatus({ status }: { status: InventoryStatusValue }) {
	const labels = { healthy: "Healthy", low: "Low stock", out_of_stock: "Out of stock" };
	const tones = { healthy: "success", low: "warning", out_of_stock: "danger" } as const;
	return <StatusBadge label={labels[status]} tone={tones[status]} />;
}
