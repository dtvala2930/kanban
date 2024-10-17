import { Spinner } from "@kanban/libs/components/custom";
import { lazyImport } from "@kanban/libs/utils";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const { Kanban } = lazyImport(
	() => import("~kanban/features/Kanban"),
	"Kanban",
);

const App = () => {
	return (
		<Suspense fallback={<Spinner />}>
			<Outlet />
		</Suspense>
	);
};

export const publicRoutes = [
	{
		path: "",
		element: <App />,
		children: [
			{
				path: "",
				element: <Kanban />,
			},
		],
	},
];
