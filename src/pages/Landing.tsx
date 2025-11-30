import { useNavigate } from 'react-router-dom';
import { Button, Card, CardHeader, CardFooter, Image } from "@heroui/react";

function Landing() {
    const navigate = useNavigate();

    const handleToDashboard = () => navigate('/dashboard');

    return (
        <div className="min-h-screen bg-linear-to-br from-teal-50 via-cyan-50 to-blue-50  text-slate-800">
            <header className="bg-white shadow-md">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src="/logo.png" alt="Fede y Lu - Veterinaria & Estética" className="h-10 w-auto" />
                        <span className="text-2xl font-bold">Fede y Lu</span>
                    </div>

                    <nav className="hidden md:block">
                        <ul className="flex gap-8 text-sm font-medium text-slate-700">
                            <li><a href="#inicio" className="hover:text-teal-600">Inicio</a></li>
                            <li><a href="#servicios" className="hover:text-teal-600">Servicios</a></li>
                            <li><a href="#contacto" className="hover:text-teal-600">Contacto</a></li>
                        </ul>
                    </nav>

                    <div className="flex items-center gap-3">
                        <a href="https://facebook.com/esteticaveterinaria" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-slate-100">
                            <img src="/facebook.png" alt="Facebook" className="w-5 h-5" />
                        </a>
                        <a href="https://instagram.com/esteticaveterinaria" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-slate-100">
                            <img src="/instagram.png" alt="Instagram" className="w-5 h-5" />
                        </a>
                        <a href="https://tiktok.com/@esteticaveterinaria" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-slate-100">
                            <img src="/tik-tok.png" alt="TikTok" className="w-5 h-5" />
                        </a>
                        <a href="https://wa.me/51961433163" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-slate-100">
                            <img src="/whatsapp.png" alt="WhatsApp" className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </header>

            {/* Hero */}
            <section className="bg-linear-to-br from-teal-50 via-cyan-50 to-blue-50 py-12">
                <div className="max-w-6xl mx-auto px-4 md:flex md:items-center md:gap-12">
                    <div className="md:w-1/2 space-y-4 z-10">
                        <p className=" font-semibold">Priorizamos el bienestar de tu mascota</p>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900">Estética Veterinaria</h1>
                        <p className="text-slate-600">Peluquería Canina · Baños Medicados · Hidratados</p>
                        <div className="flex items-center gap-3 mt-4">
                            <Button onPress={handleToDashboard} className="px-6 py-4 rounded-md bg-teal-500 hover:bg-teal-500 text-white font-semibold shadow cursor-pointer ">Reservar cita</Button>
                            <a href="#servicios" className="px-5 py-2 rounded-md border border-slate-200 bg-white text-teal-600 font-semibold">Ver servicios</a>
                        </div>
                    </div>

                    <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
                        <img src="/perritos.png" alt="Perritos felices" className="max-w-md w-full object-contain" />
                    </div>
                </div>
            </section>

            <section id="servicios" className="max-w-6xl mx-auto px-4 py-12">
                <div className="max-w-[1100px] mx-auto grid grid-cols-12 gap-4">
                    <Card isFooterBlurred className="w-full h-80 col-span-12 sm:col-span-5 relative">
                        <CardHeader className="absolute z-10 top-4 left-4 flex-col items-start">
                            <p className="text-tiny text-white/60 uppercase font-bold">Nuevo</p>
                            <h4 className="text-white/90 font-medium text-xl">Cortes</h4>
                        </CardHeader>
                        <Image
                            removeWrapper
                            alt="Paquetes de cuidado"
                            className="z-0 w-full h-full scale-105 object-cover"
                            src="/corte_de_pelo_perros_1024x1024.webp"
                        />
                        <CardFooter className="absolute bg-black/40 bottom-0 border-t border-white/20 z-10 justify-between px-4 py-3">
                            <div>
                                <p className="text-white/80 text-sm">Peluquería</p>
                                <p className="text-white/80 text-sm">Incluye corte y baño</p>
                            </div>
                            <Button className="text-sm bg-teal-500 text-white/90 " radius="full" size="sm" onPress={handleToDashboard}>Reservar cita</Button>
                        </CardFooter>
                    </Card>

                    <Card isFooterBlurred className="w-full h-80 col-span-12 sm:col-span-7 relative">
                        <CardHeader className="absolute z-10 top-4 left-4 flex-col items-start">
                            <p className="text-tiny text-white/60 uppercase font-bold">NUEVO</p>
                            <h4 className="text-white/90 font-medium text-xl">Consulta Dermatológica</h4>
                        </CardHeader>
                        <Image
                            removeWrapper
                            alt="Consulta dermatológica"
                            className="z-0 w-full h-full object-cover"
                            src="/DoctorVet-Laser-Therapy-Dermatitis-atopica-del-perro-2-1024x683.jpg"
                        />
                        <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t border-white/20 px-4 py-3">
                            <div className="flex grow gap-2 items-center">
                               
                                <div className="flex flex-col">
                                    <p className="text-sm text-white/80">Dermatología</p>
                                    <p className="text-sm text-white/80">Agenda tu consulta hoy.</p>
                                </div>
                            </div>
                            <Button radius="full" size="sm" onPress={handleToDashboard} className='bg-teal-500 text-sm text-white/90 '>Reservar cita</Button>
                        </CardFooter>
                    </Card>
                    <Card className="col-span-12 h-80 relative overflow-hidden mt-4">
                        <CardHeader className="absolute z-10 top-4 left-6 flex-col items-start">
                            <p className="text-tiny text-white/70 uppercase font-bold">Atención</p>
                            <h4 className="text-white font-medium text-2xl">Consulta General</h4>
                            <p className="mt-2 text-white/90 text-sm max-w-lg">Revisión completa y orientación sobre cuidado en una sola consulta.</p>
                        </CardHeader>

                        <Image
                            removeWrapper
                            alt="Consulta general"
                            className="z-0 w-full h-full object-cover filter brightness-70"
                            src="/purina-esterilización-de-mascotas.avif"
                        />

                        <CardFooter className="absolute bottom-0 z-10 px-4 py-3 justify-end">
                            <Button radius="full" size="sm" onPress={handleToDashboard} className='bg-teal-500 text-sm text-white/90 '>Reservar cita</Button>
                        </CardFooter>
                    </Card>
                </div>
            </section>

            <footer className="bg-teal-500 text-white">
                <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-4 gap-6">
                    <div>
                        <h4 className="font-bold">Estética Veterinaria</h4>
                        <p className="mt-2 text-sm">Servicios Estéticos para Mascotas</p>
                        <p className="mt-2 text-sm">Dirección: Av. Los Angeles Nº 322 Sta Luzmila - Comas</p>
                        <p className="mt-2 text-sm inline-flex items-center gap-2"><img src="/llamar.png" alt="Teléfono" className="w-4 h-4"/> 961 433 163</p>
                        <p className="mt-2 text-sm">clinicaveterinariafedeylu@gmail.com</p>
                    </div>

                    <div>
                        <h4 className="font-bold">Horarios de Atención</h4>
                        <p className="mt-2 text-sm">Lunes a Viernes: 9:00 AM - 8:00 PM</p>
                        <p className="mt-2 text-sm">Sábados: 9:00 AM - 6:00 PM</p>
                        <p className="mt-2 text-sm">Domingos: 9:00 AM - 12:00 PM</p>
                    </div>

                    <div>
                        <h4 className="font-bold">Servicios</h4>
                        <p className="mt-2 text-sm">Cortes Profesionales</p>
                        <p className="mt-2 text-sm">Baños Medicados / Hidratados</p>
                        <p className="mt-2 text-sm">Tratamientos Dermatológicos</p>
                    </div>

                    <div>
                        <h4 className="font-bold">Síguenos</h4>
                        <div className="mt-2 flex gap-3">
                                <a href="https://facebook.com/esteticaveterinaria" target="_blank" rel="noreferrer"><img src="/facebook.png" alt="Facebook" className="w-5 h-5"/></a>
                                <a href="https://instagram.com/esteticaveterinaria" target="_blank" rel="noreferrer"><img src="/instagram.png" alt="Instagram" className="w-5 h-5"/></a>
                                <a href="https://tiktok.com/@esteticaveterinaria" target="_blank" rel="noreferrer"><img src="/tik-tok.png" alt="TikTok" className="w-5 h-5"/></a>
                                <a href="https://wa.me/51961433163" target="_blank" rel="noreferrer"><img src="/whatsapp.png" alt="WhatsApp" className="w-5 h-5"/></a>
                            </div>
                    </div>
                </div>

                <div className="bg-teal-500 text-white/90 text-sm py-4">
                    <div className="max-w-6xl mx-auto px-4 text-center">&copy; 2025 Fede y Lu - Todos los derechos reservados</div>
                </div>
            </footer>
        </div>
    );
}

export default Landing;