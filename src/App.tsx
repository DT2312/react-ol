import { useEffect } from 'react';
import './style.css';
import { ServiceMap } from './Servicemap';

function App() {

  let map: any;

  useEffect(() => {
    map = new ServiceMap()
  }, [])

  const handleActivateLayer = (activated: boolean, valueTile: string) => {
    map.tiles(activated, valueTile);
  }
  const handleActivateProyeccion = (activated: boolean, valueProyeccion: string) => {
    map.setProyeccion(activated, valueProyeccion)
  }

  const capas = [{ capa: 'capa base', valueTile: 'tileOSM' }, { capa: 'tileWMS', valueTile: 'tileWMS' }]
  const projection = [{ proyeccion: 'EPSG: 3857', valueProyeccion: '3857' }, { proyeccion: 'EPSG: 4326', valueProyeccion: '4326' }]


  return (
    <div className="App">
      <div className='content-mapa'>
        <div className='drawer'>
          <section>
            <h4 className='menu-mapa__titulo'>Capas del mapa</h4>
            {
              capas.map((element, i) => (
                <label key={i} className="opciones-mapa">
                  <input type="checkbox" onClick={(e: any) => handleActivateLayer(e.target.checked, element.valueTile)} />
                  {element.capa}
                </label>
              ))
            }
          </section>
          <section>
            <h4 className='menu-mapa__titulo'>Proyecciones</h4>
            {
              projection.map((element, i) => (
                <label key={i} className="opciones-mapa">
                  <input type="checkbox" onClick={(e: any) => handleActivateProyeccion(e.target.checked, element.valueProyeccion)} />
                  {element.proyeccion}
                </label>
              ))
            }
          </section>
        </div>
        <div id="map" style={{ width: '100%', height: '100%' }} className="mapa" ></div>
      </div>
    </div>
  );
}

export default App;
