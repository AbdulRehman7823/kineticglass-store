import React from 'react'

function Footer() {
  return (
    <div>
    <footer class="p-4 bg-white rounded-lg shadow md:px-6 md:py-8 dark:bg-gray-900">
        <div class="sm:flex sm:items-center sm:justify-between">
            <a href="https://flowbite.com/" class="flex items-center mb-4 sm:mb-0">
                <span class="text-cyan-900 self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Kinetic Glass</span>
            </a>
            <ul class="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <a href="#" class="mr-4 hover:underline md:mr-6 ">Github</a>
                </li>
                <li>
                    <a href="#" class="mr-4 hover:underline md:mr-6">Kinetic Glass UI</a>
                </li>
                <li>
                    <a href="#" class="mr-4 hover:underline md:mr-6 ">Story Book</a>
                </li>
               
            </ul>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 3 <a href="" class="hover:underline">Kinetic Glass™</a>. All Rights Reserved.
        </span>
    </footer>
    </div>
  )
}

export default Footer