import OSM from "ol/source/OSM.js";
import TileLayer from "ol/layer/Tile.js";
import View from "ol/View.js";
import TileWMS from "ol/source/TileWMS.js";
import { ScaleLine, defaults as defaultControls } from "ol/control.js";
import { Map } from "ol";
export class ServiceMap {
  constructor() {
    this.tileOSM = new TileLayer({
      visible: false,
      source: new OSM(),
    });
    this.tileWMS = new TileLayer({
      visible: false,
      source: new TileWMS({
        url: "https://ahocevar.com/geoserver/wms",
        params: {
          LAYERS: "ne:NE1_HR_LC_SR_W_DR",
          TILED: true,
        },
      }),
    });
    this.map = new Map({
      controls: defaultControls().extend([
        new ScaleLine({
          units: "degrees",
        }),
      ]),
      target: "map",
      layers: this.getLayers(),
      view: this.getView(),
    });
  }

  getView() {
    this.view = new View({
      projection: "EPSG:3857", //<-- por defecto.
      // projection: "EPSG:4326", //<-- Crear apartados de proyecciones.
      center: [0, 0],
      zoom: 2,
    });
    return this.view;
  }

  tiles(activate, valueTile) {
    let tile;
    let name;
    switch (valueTile) {
      case "tileWMS":
        name = "WMS";
        tile = this.tileWMS;
        this.tileWMS.setVisible(activate);
        tile.set(name, valueTile);
        break;
      case "tileOSM":
        name = "OSM";
        tile = this.tileOSM;
        this.tileOSM.setVisible(activate);
        tile.set(name, valueTile);
        break;
    }
    // if (activate) {
    //   this.map.addLayer(tile); //<-- añadir capa
    // } else {
    // ELIMINAR CAPA POR COMPLETO
    //   this.map.getLayers().forEach((layer) => {
    //     if (layer.get(name) && layer.get(name) === valueTile) {
    //       this.map.removeLayer(layer);
    //     }
    //   });
    // }
  }

  setProyeccion(activate, valueProyeccion) {
    let properties;
    switch (valueProyeccion) {
      case "3857":
        properties = this.map.getView().getProperties();
        properties["projection"] = "EPSG:3857";
        this.map.setView(new View(properties));
        break;
      case "4326":
        properties = this.map.getView().getProperties();
        properties["projection"] = "EPSG:4326";
        console.log(properties)
        this.map.setView(new View(properties));
        break;
    }
  }

  getLayers() {
    this.layers = [this.tileOSM, this.tileWMS];
    return this.layers;
  }
}
