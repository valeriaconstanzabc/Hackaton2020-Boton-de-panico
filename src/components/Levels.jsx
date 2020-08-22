import React, { useContext, useEffect } from 'react'
import '../styles/Levels.css'
import firebase from 'firebase'
import { UserContext } from '../Context/UserContext.js'
import Barra from '../assets/barra2.png'
import ReactPlayer from 'react-player'

const Levels = () => {
    let { setCheck } = useContext(UserContext)

    const [questions, setQuestions] = React.useState([])


    console.log(questions)

    useEffect(() => {
        //<----------------Questions----------------------------->
        const getQuestions = async () => {
            try {
                const db = firebase.firestore()
                const data = await db.collection('preguntas').get()
                const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
                setQuestions(arrayData)
                console.log(arrayData)
            } catch (error) {
                console.log(error)
            }
        }
        getQuestions()
    }, [])

    const user = firebase.auth().currentUser;
    user.providerData.forEach(function (profile) {
        const name = profile.displayName;
        const email = profile.email;
        const db = firebase.firestore()
        db.collection('usuarios').add({
            nameUser: name,
            emailUser: email
        })
    });

    return (
        <div className="containerLevels">
            <img src={Barra} alt='barra' className='barra' />
            <h1 className='titulo'>Nivel 1</h1>
            <h2 className='titulo'>Bienvenida al Nivel 1 de tu aprendizaje.</h2>
            <p className='questions'>Revisa el contenido que hemos preparado para tí, y luego responde las preguntas para poder ir avanzando de nivel.
            Recuerda que estar bien informada es lo que te ayudará a defenderte de situaciones de violencia obstetrica.
Edúcate y empodérate. ¡Tu puedes!</p>
            <h2 className='titulo'>¿Qué es la violencia obtétrica?</h2>
            <p className='questions'>Para entenderlo, mira este testimonio</p>
            <section className="multimedia">
                <div className='video' >
                    <ReactPlayer width={382}
                        height={313} url="https://www.youtube.com/watch?v=8yeiNhj07tY" controls={true} />
                </div>
                <p className="infoMultimedia">¿Quieres saber más? pincha <a href='https://ovochile.cl/'>aquí</a></p>
                <h3 className='titulo'>Preguntas</h3>
            </section>
            {
                questions.map((item, index) => (
                    <main className="level-lilaDos">
                        <h2 className='titulo3'>{item.pregunta}</h2>
                        <div>

                            <section className="questions">
                                <h4 >{item.A}</h4>
                                <input type="radio" id="" name="" value="" />
                                <label key={index} className='questionsDos' for="">{item.res1}</label><br></br>
                                <input type="radio" id="" name="" value="" />
                                <label key={index} className='questionsDos' for="">{item.res2}</label><br></br>
                                <input type="radio" id="" name="" value="" />
                                <label key={index} className='questionsDos' for="">{item.res3}</label><br></br>
                                <input type="radio" id="" name="" value="" />
                                <label key={index} className='questionsDos' for="">{item.res4}</label><br></br>
                            </section>
                        </div>
                    </main>))
            }
            <div className='containerCheck'>
                <input type="checkbox" className="add-item__input"
                    onChange={e => setCheck(e.target.value)} value="check"
                />
                <label className='nivel'>Nivel completado</label>
            </div>

            <button className="levelButton">Enviar Respuestas</button>

        </div>


    )
}


export default Levels
