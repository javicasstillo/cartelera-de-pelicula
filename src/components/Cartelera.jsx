import { useEffect, useState } from "react"



function Cartelera(){

    const [peliculas, setPeliculas] = useState([])
    const [estrenos, setEstrenos] = useState([])
    const [populares, setPopulares] = useState([])
    const [valorInput, setValorInput] = useState("")
    const [mensaje, setMensaje] = useState("")
    const [error, setError] = useState("")
    const claveApi = "980644c5248e4e484d9dfd3abc436b32"

    useEffect(() => {
        miCartelera()
        proximosEstrenos()
        peliculasPopulares()
    }, [])

    const extraerInput= (e)=>{
        setValorInput(e.target.value)
    }

    const buscar = async(e) => {
        e.preventDefault()
        const obtenerDatos = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${claveApi}&query=${valorInput}&language=es-ES`)
        if (obtenerDatos.status === 200){
            const resultado = await obtenerDatos.json()
                if (resultado.results.length === 0) {
                    setPeliculas([])
                    setEstrenos([])
                    setError("Película no encontrada.")
                    setMensaje("")
                } else {
                    setPeliculas(resultado.results)
                    setEstrenos([])
                    setMensaje(`Resultados de busqueda para: ${valorInput}`)
                    setError("") // Limpia mensaje si hubo uno antes
                }
            setValorInput("")
        }else {
            setError("")
            setMensaje("")
            setError("Ocurrio un error inesperado. Por favor, intente mas tarde.")
        }
    } 

    const peliculasPopulares = async()=>{
        const obtenerDatos = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${claveApi}&language=es-ES&region=AR`)
        const resultado = await obtenerDatos.json()
        console.log(resultado)
        setPopulares(resultado.results)
        
    }

    const proximosEstrenos = async()=>{
        const obtenerDatos = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${claveApi}&language=es-ES&page=1&region=AR`)
        const resultado = await obtenerDatos.json()
        setEstrenos(resultado.results)
    }   

    const miCartelera = async()=>{
        const obtenerDatos = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${claveApi}&language=es-ES&region=AR`)
        const resultado = await obtenerDatos.json()
        setPeliculas(resultado.results)

    }

    return <div> 
        <nav className="bg-body-tertiary mb-3 py-3">
            <div className="container ">
                <h1 className="text-center">Mi Cartelera 🍿</h1>
                <form className="text-center d-flex justify-content-center gap-3">
                    <input type="text" value={valorInput} placeholder="Buscar..." onChange={extraerInput} />
                    <button className="btn btn-primary" onClick={buscar}>Buscar</button>
                </form>
            </div>     
        </nav>

        <main>

            <section id="populares" className="overflow-hidden">
                <h3 className="text-center mb-3">Populares</h3>
                <div className="scroll-track d-flex align-items-center mb-5">
                    {populares.map((item,index) => (
                    <div key={index} className="me-3 flex-shrink-0">
                        <a href={`https://www.themoviedb.org/movie/${item.id}`}>
                        <img
                        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                        className="scroll-image"
                        alt={item.title}
                        /></a>
                    </div>
                    ))}
                    
                    {populares.map((item, index) => (
                    <div key={index} className="me-3 flex-shrink-0">
                        <a href={`https://www.themoviedb.org/movie/${item.id}`}>
                        <img
                        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                        className="scroll-image"
                        alt={item.title}
                        /></a>
                    </div>
                    ))}
                </div>
            </section>


            <section id="cartelera" className="bg-body-tertiary">
                <div className="container mb-3"> 
                    
                    <div className="row justify-content-center gy-3">
                        <p className="mt-5 mb-0 text-center">{mensaje}</p>
                        <p className="text-danger text-center">{error}</p>
                        {peliculas.map((item, index)=>{
                        return <div key={index} className="col-6 col-md-4">
                                    <div className="text-center card h-100">
                                        <a href={`https://www.themoviedb.org/movie/${item.id}`}>
                                        <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title} className="text-center" /></a>
                                        <p className="lead mt-3 mb-3">Lanzamiento: {item.release_date}</p>   
                                    </div>
                                </div>
                        })}
                    </div>
                </div>
            </section>

            <section id="proximosEstrenos">
                <div className="container">
                    <div className="row justify-content-center gy-3">
                        
                        {estrenos.map((item, index)=>{
                            return <div key={index} className="col-auto">
                                <h3 className="text-center mt-3 mb-3">Proximos Estrenos</h3>
                                <div className="text-center card h-100">
                                    <a href={`https://www.themoviedb.org/movie/${item.id}`}>
                                    <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title} className="img" /></a>
                                    <p className="lead mt-3">Se lanza: {item.release_date}</p>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </section>
        </main>

        <footer className="mt-5 py-3 bg-body-tertiary text-center">
            <p className="mb-0">&copy; Desarrollado por: Javier Castillo</p>
        </footer>
    </div>
}

export default Cartelera