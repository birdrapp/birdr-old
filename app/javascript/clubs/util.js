import { Wkt } from 'wicket/wicket';

export const wktToPaths = wkt => {
  const w = new Wkt();
  w.read(wkt);
  const geoJSON = w.toJson();
  return geoJSON.coordinates.map(a => {
    return a.map(p => ({
      lat: p[0],
      lng: p[1]
    }));
  });
};

export const polygonToWkt = path => {
  const latLngs = path.getArray();
  const points = latLngs
    .concat(latLngs[0])
    .map(l => `${l.lat()} ${l.lng()}`)
    .join(',');

  return `POLYGON((${points}))`;
};
