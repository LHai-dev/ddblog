import Link from "next/link";

export default function CategoryBar() {

  const navigation = [
    {
      href: "javascript:void(0)",
      name: "All"
    },
    {
      href: "javascript:void(0)",
      name: "Spring"
    },
    {
      href: "javascript:void(0)",
      name: "ReactJs"
    },
    {
      href: "javascript:void(0)",
      name: "Golang"
    },
    {
      href: "javascript:void(0)",
      name: "NextJs"
    },
  ]

  return (
    <div className="max-w-screen-xl mx-auto md:px-8">
      <ul className="w-full border-b flex items-center gap-x-3 overflow-x-auto list-none">
        {
          navigation.map((item, idx) => (
            <li key={idx} className={`py-2 border-b-2 ${idx == 0 ? "border-indigo-600 text-indigo-600" : "border-white text-gray-500"}`}>
              <Link
                href={item.href}
                className="py-2.5 px-4 rounded-lg duration-150 text-sm hover:text-indigo-600 hover:bg-gray-50 active:bg-gray-100 font-medium"
              >
                {item.name}
              </Link>
            </li>
          ))
        }
      </ul>

    </div>
  )
}
