import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { IoLogoGithub, IoGlobeOutline } from "react-icons/io5";
import { Fragment, useState } from "react";
import MeIcon from "../assets/me.png";
import { config } from "../utils/config";

export function PopupAboutMe() {
  const [isShowing, setIsShowing] = useState(false);
  const MyLinks = [
    {
      link: config.GITHUB_REPO_URI,
      icon: <IoLogoGithub size="30" />,
    },
    {
      link: config.PERSONAL_WEBSITE,
      icon: <IoGlobeOutline size="30" />,
    },
  ];

  return (
    <div className="w-full max-w-sm z-[1]">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "" : "text-opacity-90"}
                group inline-flex items-center rounded-md bg-black px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none`}
              onMouseEnter={() => setIsShowing(true)}
              onMouseLeave={() => setIsShowing(false)}
            >
              <span>About me</span>
              <ChevronDownIcon
                className={`${open ? "" : "text-opacity-70"}
                  ml-2 h-5 w-5 text-white transition duration-150 ease-in-out group-hover:text-opacity-80`}
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
              show={isShowing}
            >
              <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-[calc(50vw)] max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                <div
                  className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white flex"
                  onMouseEnter={() => setIsShowing(true)}
                  onMouseLeave={() => setIsShowing(false)}
                >
                  <section className="w-[50%]">
                    <img src={MeIcon} className="w-[30rem] bg-yellow-300" />
                  </section>
                  <section className="w-[50%] p-5">
                    <h1 className="text-[2rem] font-extrabold">Hey!</h1>
                    <p className="text-gray-400 font-normal mt-5">
                      Thank you for visiting my website. I hope you're having
                      fun 😁. My name is Osamu, I am a software engineer who
                      loves to code and design.{" "}
                    </p>
                    <section className="grid place-items-center">
                      <p className="font-semibold mt-10">Find me on</p>
                      <div className="flex mt-5 gap-3">
                        {MyLinks.map((el, i) => (
                          <a
                            key={i}
                            href={el.link}
                            target="_blank"
                            className="border-[2px] border-gray-200 p-1 rounded-lg hover:bg-gray-100"
                          >
                            {el.icon}
                          </a>
                        ))}
                      </div>
                    </section>
                  </section>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
