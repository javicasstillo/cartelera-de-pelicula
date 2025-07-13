import { useEffect, useState } from "react"



function Cartelera(){

    const [peliculas, setPeliculas] = useState([])
    const [estrenos, setEstrenos] = useState([])
    const claveApi = "980644c5248e4e484d9dfd3abc436b32"
    const maximoCaracter = 100
    const recortar = (texto) => {
        if (!texto) {
            return "Sin descripcion"
        } else if (texto.length > maximoCaracter) {
            return texto.substring(0, maximoCaracter) + "..."
        } else {
           return texto
        }

    }
    useEffect(() => {
        miCartelera()
        proximosEstrenos()
    }, [])

    const proximosEstrenos = async()=>{
        const obtenerDatos = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${claveApi}&language=es-ES&page=1&region=AR`)
        const resultado = await obtenerDatos.json()
        console.log(resultado)
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
                    <input type="text" placeholder="Buscar..." />
                    <button className="btn btn-primary">Buscar</button>
                </form>
            </div>     
        </nav>

        <main>

            

            <section id="cartelera">
                <div className="container mb-3"> 
                    <div className="row justify-content-center gy-3">
                        <h3 className="text-center  mb-0">En cartelera</h3>
                        {peliculas.map((item, index)=>{
                        return <div key={index} className="col-6 col-md-4">
                                    <div className="text-center card h-100">
                                        <a href={`https://www.themoviedb.org/movie/${item.id}`}>
                                        <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title} className="text-center" /></a>
                                        <div className="container">
                                            <p className="lead mt-3 mb-3">{recortar(item.overview)}</p>
                                            <p className="lead mb-3">Lanzamiento: {item.release_date}</p>
                                        </div>
                                        

                                    </div>
                                </div>
                        })}
                    </div>
                </div>
            </section>

            <section id="proximosEstrenos">
                <div className="container">
                    <div className="row justify-content-center gy-3">
                        <h3 className="text-center mt-3">Proximos Estrenos</h3>
                        {estrenos.map((item, index)=>{
                            return <div key={index} className="col-auto">
                                <div className="text-center card h-100">
                                    <a href={`https://www.themoviedb.org/movie/${item.id}`}>
                                    <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title} className="img" /></a>
                                    <div className="container">
                                            <p className="lead mt-3 mb-3">{recortar(item.overview)}</p>
                                            <p className="lead mb-3">Se lanza: {item.release_date}</p>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </section>
        </main>

        <footer className="mt-3 py-3 bg-body-tertiary text-center">
            <p className="mb-0">&copy; Desarrollado por: Javier Castillo</p>
        </footer>
    </div>
}

export default Cartelera