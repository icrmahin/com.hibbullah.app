import StatusBadge from "../common/StatusBadge";
import type { OrderStatus as OrderStatusValue } from "../../types/order";

const labels: Record<OrderStatusValue, string> = {
	PENDING: "Pending",
	CONFIRMED: "Confirmed",
	PROCESSING: "Processing",
	OUT_FOR_DELIVERY: "Out for delivery",
	DELIVERED: "Delivered",
	CANCELLED: "Cancelled",
	RETURNED: "Returned",
};

export default function OrderStatus({ status }: { status: OrderStatusValue }) {
	const tone = status === "DELIVERED" ? "success" : status === "CANCELLED" || status === "RETURNED" ? "danger" : status === "PENDING" ? "warning" : "info";
	return <StatusBadge label={labels[status]} tone={tone} />;
}
