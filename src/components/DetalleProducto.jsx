//import { productos } from "../data/productos";
import { useParams } from "react-router-dom"
import './DetalleProducto.css'
import { useEffect,useState } from "react";
import { useContext } from "react";
import ProdutosContext from './context/productosContext';
import { CarritoContext } from './context/CarritoContext';

function DetalleProducto() {
  const { productos } = useContext(ProdutosContext);
  const { agregarProducto } = useContext(CarritoContext);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(productos);
  }, [productos]);

    const {id} = useParams();
    const  producto=items.find(p=>p.id===parseInt(id))

    const handleAdd = () => {
      if(!producto){
        console.error("Error al agregar el producto al carrito");
        return;
      }
      agregarProducto({...producto, cantidad: 1 });
    }

    if(!producto){
      return <h2>El producto no existe!</h2>
    }
  return (
    <div className="detalleProducto">
        <img className="img" src={`/src/assets/productos/${producto.cover.image_id}.webp`}/>
        <div className="info">
            <h1 className="titulo">{producto.name}</h1>
            <p className="dasarrollador"><b>Desarrollador:</b> {producto.involved_companies[0].company.name}</p>
            <p className="resumen">{producto.summary}</p>
            <h3 className="precio">$ {Math.round(producto.price, 2)}</h3>
            
            <button className="button" onClick={handleAdd}>
            <svg viewBox="0 0 16 16" className="bi bi-cart-check" height="24" width="24" xmlns="http://www.w3.org/2000/svg" fill="#fff">
              <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"></path>
              <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
            </svg>
            <p className="text">Comprar</p>
            </button>
        </div>
    </div>
  )
}

export default DetalleProducto