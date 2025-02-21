import Layout from '../Layouts/layout'
import '../styles/refiere.css'

export const metadata = {
  title: 'Refiere y Gana | Verdant Inmobiliaria',
  description:
    'Refiere a tus amigos y gana increíbles premios con Verdant Inmobiliaria.',
  keywords: 'refiere, gana, premios, verdant'
}

export default function Home () {
  return (
    <Layout>
      <section className='info-section'>
        <div className='info-section__container'>
          <div className='info-section__title'>
            <h1>
              ¡Refiere y<br />
              <span>Gana!</span>
            </h1>
            <p>
              ¡Por cada referido ganas
              <br />
              <span>s/.2,000.00 !</span>
            </p>
            <img className='arrow flecha_1' src='/flecha-gris.png' />
          </div>
          <picture>
            <img src='/refiere/refiere-pig.png' alt='Alcancía sobre monedas' />
            <img className='arrow flecha_2' src='/flecha-gris.png' />
          </picture>
          <ul>
            <li>
              <div className='bubble'>
                Recomienda a un amigo o conocido
                <span className='corner'></span>
              </div>
              <div className='message'>
                Invita a esa persona que sueña con su hogar
              </div>
            </li>
            <li>
              <div className='message'>
                Llena nuestro formulario de referidos con los datos de tu
                contacto
              </div>
              <div className='bubble'>
                Regístralo fácilmente
                <span className='corner'></span>
              </div>
            </li>
            <li>
              <div className='bubble'>
                Nosotros hacemos el resto
                <span className='corner'></span>
              </div>
              <div className='message'>
                Nuestro equipo se pondrá en contacto con tu referido,
                brindándole la mejor asesoría
              </div>
            </li>
            <img className='arrow flecha_3' src='/flecha-gris.png' />
          </ul>
          <svg
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M0 0h24v24H0z' stroke='none'></path>
            <path d='m6 9 6 6 6-6'></path>
          </svg>
        </div>
      </section>
      <section className='form-section'>
        <img className='flecha_1' src='/flecha-gris.png' />
        <img className='flecha_2' src='/flecha-gris.png' />
        <img src='/refiere/billete_1.png' className='billete billete-1' />
        <img src='/refiere/billete_2.png' className='billete billete-2' />
        <img src='/refiere/billete_3.png' className='billete billete-3' />
        <img src='/refiere/billete_4.png' className='billete billete-4' />
        <img src='/refiere/billete_5.png' className='billete billete-5' />
        <img src='/refiere/billete_6.png' className='billete billete-6' />
        <h2>Completa el formulario</h2>
        <div className='form-section__container'>
          <picture>
            <img src='/refiere/verdi-form.png' alt='Verdi te da un consejo' />
            <div className='message-bubble'>
              <div className='message-container'>
                <span className='message'>
                  ¡El momento es <strong>ahora!</strong>
                </span>
                <span className='corner'></span>
              </div>
            </div>
          </picture>
          <form id='form_refiere'>
            <div className='form__container'>
              <h2>Tus datos</h2>
              <div className='row'>
                <div>
                  <input
                    type='text'
                    id='referente_name'
                    name='referente_name'
                    required
                  />
                  <label htmlFor='referente_name'>
                    <span>Nombres</span>
                  </label>
                </div>
                <div>
                  <input
                    type='text'
                    id='referente_lastname'
                    name='referente_lastname'
                    required
                  />
                  <label htmlFor='referente_lastname'>
                    <span>Apellidos</span>
                  </label>
                </div>
              </div>
              <div className='row'>
                <div className='full select'>
                  <select
                    id='referente_project'
                    name='referente_project'
                    required
                    defaultValue=''
                  >
                    <option value='' disabled></option>
                    <option value='1646'>Seed Growing Home</option>
                    <option value='1647'>Soil Quality Home</option>
                  </select>
                  <label htmlFor='referente_project'>
                    <span>Proyecto de Interés</span>
                  </label>
                </div>
              </div>
              <div className='row'>
                <div className='full'>
                  <input
                    type='text'
                    id='referente_email'
                    name='referente_email'
                    required
                  />
                  <label htmlFor='referente_email'>
                    <span>Correo electrónico</span>
                  </label>
                </div>
              </div>
              <div className='row'>
                <div className='document-container full'>
                  <div>
                    <select
                      id='referente_document_type'
                      name='referente_document_type'
                      defaultValue={'DNI'}
                    >
                      <option value='DNI'>DNI</option>
                      <option value='C.E'>C.E</option>
                    </select>
                  </div>
                  <div>
                    <div>
                      <input
                        type='number'
                        id='referente_identification'
                        name='referente_identification'
                        required
                      />
                      <label htmlFor='referente_identification'>
                        <span>Número de identificación</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='full'>
                  <input
                    type='text'
                    id='referente_phone'
                    name='referente_phone'
                    required
                  />
                  <label htmlFor='referente_phone'>
                    <span>Número de teléfono</span>
                  </label>
                </div>
              </div>
            </div>
            <div className='form__container'>
              <h2>Datos del referido</h2>
              <div className='row'>
                <div>
                  <input
                    type='text'
                    id='referido_name'
                    name='referido_name'
                    required
                  />
                  <label htmlFor='referido_name'>
                    <span>Nombres</span>
                  </label>
                </div>
                <div>
                  <input
                    type='text'
                    id='referido_lastname'
                    name='referido_lastname'
                    required
                  />
                  <label htmlFor='referido_lastname'>
                    <span>Apellidos</span>
                  </label>
                </div>
              </div>
              <div className='row'>
                <div className='full select'>
                  <select
                    id='referido_project'
                    name='referido_project'
                    required
                    defaultValue=''
                  >
                    <option value='' disabled></option>
                    <option value='1646'>Seed Growing Home</option>
                    <option value='1647'>Soil Quality Home</option>
                  </select>
                  <label htmlFor='referido_project'>
                    <span>Proyecto de Interés</span>
                  </label>
                </div>
              </div>
              <div className='row'>
                <div className='full'>
                  <input
                    type='text'
                    id='referido_email'
                    name='referido_email'
                    required
                  />
                  <label htmlFor='referido_email'>
                    <span>Correo electrónico</span>
                  </label>
                </div>
              </div>
              <div className='row'>
                <div className='document-container full'>
                  <div>
                    <select
                      id='referido_document_type'
                      name='referido_document_type'
                      defaultValue={'DNI'}
                    >
                      <option value='DNI'>DNI</option>
                      <option value='C.E'>C.E</option>
                    </select>
                  </div>
                  <div>
                    <div>
                      <input
                        type='number'
                        id='referido_identification'
                        name='referido_identification'
                        required
                      />
                      <label htmlFor='referido_identification'>
                        <span>Número de identificación</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='full'>
                  <input
                    type='text'
                    id='referido_phone'
                    name='referido_phone'
                    required
                  />
                  <label htmlFor='referido_phone'>
                    <span>Número de teléfono</span>
                  </label>
                </div>
              </div>
            </div>
            <div className='button-container'>
              <button>Enviar mensaje</button>
            </div>
          </form>
          <img className='hojas' src='/barra-hojas.png' alt='Barra hojas' />
        </div>
      </section>
    </Layout>
  )
}
