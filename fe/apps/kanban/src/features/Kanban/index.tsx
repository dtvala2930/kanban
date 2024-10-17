import { KanbanBoard, KanbanDialog } from "@kanban/libs/components/custom";

export const Kanban = () => {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const handleUpdateKanban = (value: any) => {
		console.log("kkkkkkkkkkkkkkkkkkkkkk", value);
	};

	return (
		<>
			<div className="pl-2">
				<KanbanDialog />
			</div>
			<KanbanBoard callback={handleUpdateKanban} />
		</>
	);
};
