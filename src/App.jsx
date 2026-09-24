import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { LeaveDataProvider } from "./hooks/useLeaveData";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LeaveDataProvider>
          <AppRoutes />
        </LeaveDataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
