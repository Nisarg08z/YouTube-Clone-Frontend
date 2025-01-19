import React from 'react'
import { Header, Sidebar } from './components'
import { Outlet } from 'react-router-dom'

function Layout() {
    return (
        <>
            <div className="flex h-screen bg-black text-white">
                <Sidebar />
                <div className="flex flex-col flex-1">
                    <Header />
                    <div className="flex-1 overflow-auto p-4">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Layout