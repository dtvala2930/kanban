import { AppProvider } from "~kanban/providers/app";
import { AppRoutes } from "~kanban/routes";

function App() {
	return (
		<AppProvider>
			<AppRoutes />
		</AppProvider>
	);
}

export default App;
