import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@kanban/libs/components/base";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Input,
	Label,
} from "@kanban/libs/components/base";
import { Button } from "@kanban/libs/components/base";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function KanbanDialog() {
	const formSchema = z.object({
		taskName: z.string().min(1, { message: "Please input task name" }),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			taskName: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<Dialog>
					<DialogTrigger asChild>
						<Button variant="outline" className="p-2">
							Add task
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader>
							<DialogTitle>Add task</DialogTitle>
							<DialogDescription>Input your new task name.</DialogDescription>
						</DialogHeader>
						<FormField
							control={form.control}
							name="taskName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Task name:</FormLabel>
									<FormControl>
										<Input placeholder="task name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button variant="outline" type="submit" className="p-2">
								Submit
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</form>
		</Form>
	);
}
