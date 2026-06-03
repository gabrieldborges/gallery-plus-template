import { BrowserRouter, Routes, Route } from "react-router";
import LayoutMain from "./pages/layout-main";
import PageComponents from "./pages/page-components";
import PageHome from "./pages/page-home";
import PagePhotoDetails from "./pages/page-photo-details";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<LayoutMain />}>
            <Route index element={<PageHome />} />
            <Route path="/components" element={<PageComponents />} />
            <Route path="/photos/:id" element={<PagePhotoDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
