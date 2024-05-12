import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { FaBars, FaFacebookF, FaGithub, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { createRefreshMutation } from '@/lib/react-query/queries';
import useAuth from '@/hooks/useAuth';
import LoadingUi from '@/components/shared/LoadingUi';

const navigation = [
    { name: 'Home', href: '#home' },
    { name: 'Demo', href: '#demo' },
    { name: 'Features', href: '#features' },
    { name: 'Contact', href: '#contact' },
]

const Home = () => {
    const { user, isAuthenticated } = useAuth();
    const refreshMutation = createRefreshMutation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        if (!isAuthenticated && !user.accessToken) refreshMutation.mutate();
    }, [])

    return (
        <>
            {
                isAuthenticated && user.accessToken ?
                    <Navigate to='/home' /> :
                    (
                        <>
                            { refreshMutation.isPending && <LoadingUi /> }

                            { refreshMutation.isSuccess && isAuthenticated && <Navigate to='/home' /> }

                            { refreshMutation.isError &&
                                <div className="bg-white w-full">
                                    <header className="absolute inset-x-0 top-0 z-50">
                                        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                                            <div className="flex lg:flex-1">
                                                <a href="#" className="-m-1.5 p-1.5">
                                                    <span className="sr-only">Your Company</span>
                                                    <img
                                                        className="h-10 w-auto"
                                                        src="/docFlowIcon.png"
                                                        alt=""
                                                    />
                                                </a>
                                            </div>
                                            <div className="flex lg:hidden">
                                                <button
                                                    type="button"
                                                    className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                                                    onClick={() => setMobileMenuOpen(true)}
                                                >
                                                    <span className="sr-only">Open main menu</span>
                                                    <FaBars size={25} />
                                                </button>
                                            </div>
                                            <div className="hidden lg:flex lg:gap-x-12">
                                                {navigation.map((item) => (
                                                    <a key={item.name} href={item.href} className="text-base font-semibold leading-6 text-gray-900">
                                                        {item.name}
                                                    </a>
                                                ))}
                                            </div>
                                            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                                                <Button>
                                                    <Link to='/sign-up'>Sign up</Link>
                                                </Button>
                                            </div>
                                        </nav>
                                        {
                                            mobileMenuOpen &&
                                            <div className="lg:hidden">
                                                <div className="fixed inset-0 z-50" />
                                                <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                                                    <div className="flex items-center justify-between">
                                                        <a href="#" className="-m-1.5 p-1.5">
                                                            <img
                                                                className="h-8 w-auto"
                                                                src="./docFlowIcon.png"
                                                                alt=""
                                                            />
                                                        </a>
                                                        <button type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700" onClick={() => setMobileMenuOpen(false)}>
                                                            <IoClose size={30} />
                                                        </button>
                                                    </div>
                                                    <div className="mt-6 flow-root">
                                                        <div className="-my-6 divide-y divide-gray-500/10">
                                                            <div className="space-y-2 py-6">
                                                                {navigation.map((item) => (
                                                                    <a
                                                                        key={item.name}
                                                                        href={item.href}
                                                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                                                    >
                                                                        {item.name}
                                                                    </a>
                                                                ))}
                                                            </div>
                                                            <div className="py-6">
                                                                <Link
                                                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                                                    to="sign-in">
                                                                    Log in
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </header>

                                    <section id='home' className='h-screen'>
                                        <div className="relative isolate px-6 pt-1 lg:px-8">
                                            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                                                <div
                                                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                                                    style={{
                                                        clipPath:
                                                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                                                    }}
                                                />
                                            </div>
                                            <div className="mx-auto max-w-2xl pt-40 lg:pt-40">
                                                <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                                                    <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                                                        Learn and explore the features of our product.{' '}
                                                        <a href="#" className="font-semibold text-violet-600">
                                                            <span className="absolute inset-0" aria-hidden="true" />
                                                            Read more <span aria-hidden="true">&rarr;</span>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="text-center">
                                                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                                                        Unleash Your Ideas, Anytime, Anywhere with DocFlow
                                                    </h1>
                                                    <p className="mt-6 text-lg leading-8 text-gray-600">
                                                        Unlock the potential of your idea wtih this intuitive platform that blends smart features and secure collaboration, redefining how you work on documents.
                                                    </p>
                                                    <div className="mt-10 flex items-center justify-center gap-x-6">
                                                        <Button>
                                                            <Link to='/sign-up'>Get started</Link>
                                                        </Button>
                                                        <Button variant={'outline'}>
                                                            <a href="#">Learn more</a>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                                                aria-hidden="true"
                                            >
                                                <div
                                                    className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                                                    style={{
                                                        clipPath:
                                                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </section>

                                    <section id="demo" className='h-screen bg-slate-100'>
                                        <div></div>
                                    </section>
                                    <section id="features" className='h-screen bg-white'>
                                        <div></div>
                                    </section>
                                    <section id="contact" className='h-40 bg-slate-100'>
                                        <div className='flex flex-col items-center justify-between w-full h-full p-8 sm:flex-row'>
                                            <div>
                                                <p className='text-sm'>docflowofficial@gmail.com</p>
                                                <p className='text-sm'>© 2024 DocFlow Inc. All rights reserved.</p>
                                            </div>
                                            <div className='flex flex-row gap-4'>
                                                <div className='social-icon'><FaFacebookF size={22} color="#7c3aed" /></div>
                                                <div className='social-icon'><FaInstagram size={22} color="#7c3aed" /></div>
                                                <div className='social-icon'><FaTwitter size={22} color="#7c3aed" /></div>
                                                <div className='social-icon'><FaGithub size={22} color="#7c3aed" /></div>
                                                <div className='social-icon'><FaYoutube size={22} color="#7c3aed" /></div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            }
                        </>
                    )
            }
        </>
    )
}

export default Home;