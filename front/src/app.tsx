import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Header from "./components/header";
import PageLayout from "./layouts/page-layout";

export default function App() {
  return (
    <PageLayout>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<h1>Sign Up</h1>} />
        <Route path="/sign-in" element={<h1>Sign in</h1>} />
        <Route path="/:username" element={<h1>Profile</h1>} />
        <Route path="/new/snippet" element={<h1>New Snippet</h1>} />
      </Routes>
    </PageLayout>
  );
}
