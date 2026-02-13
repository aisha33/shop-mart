'use client'
export default function Footer() {
  return (
    <>
   <div className='bg-neutral-primary min-h-72  border-t border-gray-200'>
    <div className="container mx-auto p-4 order-tpy-6 lg:py-8 w-full max-w-7xl">
      <div className="p-5 bg-amber-200-secondary-soft md:flex md:items-center md:justify-between">
        <div>
            <h2 className="mb-6 text-sm font-semibold text-heading uppercase">Company</h2>
            <ul className="text-body font-medium">
                <li className="mb-4">
                    <a href="#" className=" hover:underline">About</a>
                </li>
                <li className="mb-4">
                    <a href="#" className="hover:underline">Careers</a>
                </li>
                <li className="mb-4">
                    <a href="#" className="hover:underline">Brand Center</a>
                </li>
                <li className="mb-4">
                    <a href="#" className="hover:underline">Blog</a>
                </li>
            </ul>
        </div>
        <div>
            <h2 className="mb-6 text-sm font-semibold text-heading uppercase">Help center</h2>
            <ul className="text-body font-medium">
                <li className="mb-4">
                    <a href="#" className="hover:underline">Discord Server</a>
                </li>
                <li className="mb-4">
                    <a href="#" className="hover:underline">Twitter</a>
                </li>
                <li className="mb-4">
                    <a href="#" className="hover:underline">Facebook</a>
                </li>
                <li className="mb-4">
                    <a href="#" className="hover:underline">Contact Us</a>
                </li>
            </ul>
        </div>
        <div>
            <h2 className="mb-6 text-sm font-semibold text-heading uppercase">Legal</h2>
            <ul className="text-body font-medium">
                <li className="mb-4">
                    <a href="#" className="hover:underline">Privacy Policy</a>
                </li>
                <li className="mb-4">
                    <a href="#" className="hover:underline">Licensing</a>
                </li>
                <li className="mb-4">
                    <a href="#" className="hover:underline">Terms &amp; Conditions</a>
                </li>
            </ul>
        </div>
        <div>
            <h2 className="mb-6 text-sm font-semibold text-heading uppercase">Download</h2>
            <ul className="text-body font-medium">
                <li className="mb-4">
                    <a href="#" className="hover:underline">iOS</a>
                </li>
                <li className="mb-4">
                    <a href="#" className="hover:underline">Android</a>
                </li>
                <li className="mb-4">
                    <a href="#" className="hover:underline">Windows</a>
                </li>
                <li className="mb-4">
                    <a href="#" className="hover:underline">MacOS</a>
                </li>
            </ul>
        </div>
    </div>
   
    <div className="px-4 py-6 bg-neutral-secondary-soft border-t border-gray-200  md:flex md:items-center md:justify-between">
        <span className="text-sm text-body sm:text-center">© 2023 <a href={'/'}>ShopMart</a>. All Rights Reserved.
        </span>
   
      </div>
    </div>

</div>

    </>
  )
}
