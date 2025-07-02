import React from "react";
import UserMenu from "../components/userMenu";
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const user = useSelector(state => state.user)

  return (
    <section className="bg-[rgb(229,236,245)] min-h-screen w-full py-8">
      <div className="w-full px-0 grid lg:grid-cols-[260px,1fr] gap-6">
        {/* Left for menu */}
        <aside className="py-4 sticky top-24 max-h-[calc(100vh-96px)] border-r bg-white rounded-xl shadow-md hidden lg:block">
          <UserMenu />
        </aside>
        {/* Mobile menu */}
        <aside className="block lg:hidden mb-4">
          <UserMenu />
        </aside>
        {/* Right for content */}
        <main className="bg-white min-h-[75vh] rounded-xl shadow-md p-6">
          <Outlet />
        </main>
      </div>
    </section>
  )
}

export default Dashboard