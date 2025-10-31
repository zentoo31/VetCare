import '../ui/css/landing.css';
import { useNavigate } from 'react-router-dom';

function Landing() {
    const navigate = useNavigate();

    const handleToDashboard = () => {
        navigate("/dashboard");
    }

    return (
        <div>
            <header className="main-header">
                <div className="container">
                    <div className="logo">
                        <img src="logo.png" alt="Fede y Lu - Veterinaria & Estética" className="logo-image" />
                        <span className="logo-text">Fede y Lu</span>
                    </div>
                    <nav className="main-nav">
                        <ul>
                            <li><a href="#inicio" >Inicio</a></li>
                            <li><a href="#servicios" >Servicios</a></li>
                            <li><a href="#contacto" >Contacto</a></li>
                            <li><a href="#nosotros" >Nosotros</a></li>
                            <li><a href="#productos">Productos</a></li>
                        </ul >
                    </nav >
                    <div className="header-icons">
                        <div className="social-icons">
                            <a href="https://facebook.com/esteticaveterinaria" className="social-icon facebook" target='_blank' >
                                <img src="/facebook.png" alt="Facebook" />
                            </a>
                            <a href="https://instagram.com/esteticaveterinaria" className="social-icon instagram" target='_blank' >
                                <img src="/instagram.png" alt="Instagram" />
                            </a>
                            <a href="https://tiktok.com/@esteticaveterinaria" className="social-icon tiktok"  target='_blank' >
                                <img src="/tik-tok.png" alt="TikTok" />
                            </a >
                            <a href="https://wa.me/51961433163" className="social-icon whatsapp" target='_blank' >
                                <img src="/whatsapp.png" alt="WhatsApp" />
                            </a >
                        </div >
                    </div >
                </div>

            </header >

            <section className="hero-section">
                <div className="hero-content">
                    <div className="hero-text">
                        <h1 className="hero-subtitle">Priorizamos el bienestar de tu mascota</h1>
                        <h2 className="hero-title">Estética Veterinaria</h2>
                        <p className="hero-description">
                            Peluquería Canina - Baños Medicados / Hidratados
                        </p>
                        <button className="book-now-btn" onClick={handleToDashboard}>Reservar cita</button>
                    </div>
                    <div className="hero-image">
                        <img src="/perritos.png" alt="Perritos felices" className="hero-pets-image" />
                    </div>
                </div>
                <div className="wave-separator"></div>
            </section>

            <section className="content-sections" id="servicios">
                <div className="section-left">
                    <h3 className="section-title">Cortes Profesionales</h3>
                    <p className="section-description">
                        Cortes especializados según la raza y estilo de vida de tu mascota.
                        Técnicas profesionales para resaltar la belleza natural.
                    </p>
                    <button className="shop-now-btn white" onClick={handleToDashboard}>Reservar cita</button>
                    <div className="section-image"></div>
                </div>

                <div className="section-right">
                    <h3 className="section-title">Tratamientos Dermatológicos</h3>
                    <div className="offer-tag yellow">CUIDADO ESPECIALIZADO</div>
                    <p className="section-description">
                        Tratamientos dermatológicos para pieles sensibles.
                    </p>
                    <button className="shop-now-btn blue" onClick={handleToDashboard}>Reservar cita</button>
                    <div className="section-image"></div>
                </div>
            </section>

            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-section">
                            <h4>Estética Veterinaria</h4>
                            <p>Servicios Estéticos para Mascotas</p>
                            <p>Dirección: Av. Los Angeles Nº 322 Sta Luzmila - Comas</p>
                            <p>
                                <img src="/llamar.png" alt="Teléfono" className="phone-icon" />
                                Teléfono: 961 433 163
                            </p>
                            <p>Correo: clinicaveterinariafedeylu@gmail.com</p>
                        </div>

                        <div className="footer-section">
                            <h4>Horarios de Atención</h4>
                            <p>Lunes a Viernes: 9:00 AM - 8:00 PM</p>
                            <p>Sábados: 9:00 AM - 6:00 PM</p>
                            <p>Domingos: 9:00 AM - 12:00 PM</p>
                        </div>

                        <div className="footer-section">
                            <h4>Servicios</h4>
                            <p>Cortes Profesionales</p>
                            <p>Baños Medicados / Hidratados</p>
                            <p>Tratamientos Dermatológicos</p>
                        </div>

                        <div className="footer-section">
                            <h4>Síguenos</h4>
                            <div className="social-icons">
                                <a href="#" className="social-icon facebook">
                                    <img src="/facebook.png" alt="Facebook" />
                                </a>
                                <a href="#" className="social-icon instagram">
                                    <img src="/instagram.png" alt="Instagram" />
                                </a>
                                <a href="#" className="social-icon tiktok">
                                    <img src="/tik-tok.png" alt="TikTok" />
                                </a>
                                <a href="#" className="social-icon whatsapp">
                                    <img src="/whatsapp.png" alt="WhatsApp" />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <p>&copy; 2025 Fede y Lu - Todos los derechos reservados</p>
                    </div>
                </div>
            </footer>
        </div >
    )
}

export default Landing