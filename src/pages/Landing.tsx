import { useNavigate } from 'react-router-dom';

function Landing() {
    const navigate = useNavigate();

    const handleToDashboard = () => navigate('/dashboard');

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50  text-slate-800">
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
            <section className="bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 py-12">
                <div className="max-w-6xl mx-auto px-4 md:flex md:items-center md:gap-12">
                    <div className="md:w-1/2 space-y-4 z-10">
                        <p className=" font-semibold">Priorizamos el bienestar de tu mascota</p>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900">Estética Veterinaria</h1>
                        <p className="text-slate-600">Peluquería Canina · Baños Medicados · Hidratados</p>
                        <div className="flex items-center gap-3 mt-4">
                            <button onClick={handleToDashboard} className="px-6 py-3 rounded-md bg-teal-500 hover:bg-teal-500 text-white font-semibold shadow">Reservar cita</button>
                            <a href="#servicios" className="px-5 py-3 rounded-md border border-slate-200 bg-white text-teal-600 font-semibold">Ver servicios</a>
                        </div>
                    </div>

                    <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
                        <img src="/perritos.png" alt="Perritos felices" className="max-w-md w-full object-contain" />
                    </div>
                </div>
            </section>

            <section id="servicios" className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8">
                <div className="relative bg-teal-500 text-white rounded-lg p-8 overflow-hidden md:pr-80">
                    <div className="relative z-20">
                        <h3 className="text-2xl font-bold">Cortes Profesionales</h3>
                        <p className="mt-3 text-teal-100">Cortes especializados según la raza y estilo de vida de tu mascota. Técnicas profesionales para resaltar la belleza natural.</p>
                        <div className="mt-5 flex gap-3">
                            <button onClick={handleToDashboard} className="px-5 py-2 rounded-md bg-white text-teal-600 font-semibold">Reservar cita</button>
                        </div>
                    </div>

                    <div className="hidden md:block">
                        <div className="absolute top-1/2 right-6 transform -translate-y-1/2 w-80 h-72 rounded-lg overflow-hidden">
                            <img loading="lazy" src="/corte_de_pelo_perros_1024x1024.webp" alt="Corte de pelo" className="w-full h-full object-cover filter brightness-75 transition-transform duration-300 hover:scale-105 hover:brightness-90" />
                            <div className="absolute inset-0 bg-black/20 pointer-events-none" />
                        </div>
                    </div>

                    <div className="md:hidden mt-6">
                        <img loading="lazy" src="/corte_de_pelo_perros_1024x1024.webp" alt="Corte de pelo" className="w-full h-56 object-cover rounded-md filter brightness-80" />
                    </div>
                </div>

                <div className="relative bg-teal-500 text-white rounded-lg p-8 overflow-hidden md:pl-80">
                    <div className="relative z-20">
                        <h3 className="text-2xl font-bold mt-3">Tratamientos Dermatológicos</h3>
                        <p className="mt-3 text-teal-100">Tratamientos para alergias, dermatitis y problemas de piel; terapia láser y seguimiento clínico por nuestro equipo especializado.</p>
                        <div className="mt-5 flex gap-3">
                            <button onClick={handleToDashboard} className="px-5 py-2 rounded-md bg-white text-teal-600 font-semibold">Reservar cita</button>
                        </div>
                    </div>

                    <div className="hidden md:block">
                        <div className="absolute top-1/2 left-6 transform -translate-y-1/2 w-80 h-72 rounded-lg overflow-hidden">
                            <img loading="lazy" src="/DoctorVet-Laser-Therapy-Dermatitis-atopica-del-perro-2-1024x683.jpg" alt="Tratamientos dermatológicos" className="w-full h-full object-cover filter brightness-75 transition-transform duration-300 hover:scale-105 hover:brightness-90" />
                            <div className="absolute inset-0 bg-black/20 pointer-events-none" />
                        </div>
                    </div>

                    <div className="md:hidden mt-6">
                        <img loading="lazy" src="/DoctorVet-Laser-Therapy-Dermatitis-atopica-del-perro-2-1024x683.jpg" alt="Tratamientos dermatológicos" className="w-full h-56 object-cover rounded-md filter brightness-80" />
                    </div>
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