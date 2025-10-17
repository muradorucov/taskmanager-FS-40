import Link from "next/link";

export default function Sidebar({ items }) {
  return (
    <aside className="w-64 bg-white border-r flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 p-4 border-b">
          <div className="w-10 h-10 bg-gray-300 rounded-full" />
          <div>
            <h2 className="font-semibold text-sm">Murad Orucov</h2>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>

        <nav className="p-4 flex flex-col gap-3">
          {
            items.map(item => <Link key={item.title}
              href={`${item.link}`}
              className="p-2 rounded hover:bg-gray-100 transition"
            >
              {item.title}
            </Link>)
          }
        </nav>
      </div>

      <button className="m-4 p-2 rounded bg-red-500 text-white hover:bg-red-600">
        Logout
      </button>
    </aside>
  );
}
