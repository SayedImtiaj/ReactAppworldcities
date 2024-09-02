import React, { useState, useEffect, useCallback } from 'react';
import { CityService } from '../Services/CityService';
import { CountryService } from '../Services/CountryService';
import { City } from '../models/City';
import { Country } from '../models/Country';

const CityList: React.FC = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [newCountry, setNewCountry] = useState<Country>({ id: 0, name: '', iso2: '', iso3: '', totCities: 0 });
  const [newCities, setNewCities] = useState<City[]>([{ id: 0, name: '', lat: 0, lon: 0, countryId: 0, country: newCountry }]);
  const [editingCity, setEditingCity] = useState<City | null>(null);

  const loadCities = useCallback(async () => {
    try {
      const response = await CityService.getCities();
      const citiesWithCountry = response.data.data.map((city: City) => ({
        ...city,
        country: countries.find(c => c.id === city.countryId) || { id: city.countryId, name: '' }
      }));
      setCities(citiesWithCountry);
    } catch (error) {
      console.error('Failed to load cities:', error);
    }
  }, [countries]);

  const loadCountries = useCallback(async () => {
    try {
      const response = await CountryService.getCountries();
      setCountries(response.data.data);
    } catch (error) {
      console.error('Failed to load countries:', error);
    }
  }, []);

  useEffect(() => {
    loadCountries().then(() => {
      loadCities();
    });
  }, [loadCities, loadCountries]);

  const addCity = () => {
    setNewCountry({ id: 0, name: '', iso2: '', iso3: '', totCities: 0 });
    setNewCities([{ id: 0, name: '', lat: 0, lon: 0, countryId: 0, country: newCountry }]);
  };

  const handleCityChange = (index: number, field: string, value: any) => {
    const updatedCities = [...newCities];
    updatedCities[index] = { ...updatedCities[index], [field]: value };
    setNewCities(updatedCities);
  };

  const addNewCityField = () => {
    setNewCities([...newCities, { id: 0, name: '', lat: 0, lon: 0, countryId: 0, country: newCountry }]);
  };

  const saveCountryWithCities = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const countryResponse = await CountryService.postCountry(newCountry);
      const countryId = countryResponse.data.id;

      const citiesToSave = newCities.map(city => ({ ...city, countryId, country: newCountry }));
      for (const city of citiesToSave) {
        await CityService.postCity(city);
      }

      // Update total cities count in country
      await CountryService.updateCountry(countryId, { ...newCountry, totCities: newCities.length });

      loadCities();
      loadCountries();
      setNewCountry({ id: 0, name: '', iso2: '', iso3: '', totCities: 0 });
      setNewCities([{ id: 0, name: '', lat: 0, lon: 0, countryId: 0, country: newCountry }]);
    } catch (error) {
      console.error('Failed to save country with cities:', error);
    }
  };

  const editCity = (city: City) => {
    setEditingCity(city);
  };

  const saveEditCity = async (event: React.FormEvent) => {
    event.preventDefault();
    if (editingCity) {
      try {
        await CityService.updateCity(editingCity.id, editingCity);
        loadCities();
        setEditingCity(null);
      } catch (error) {
        console.error('Failed to save edited city:', error);
      }
    }
  };

  const deleteCity = async (city: City) => {
    try {
      await CityService.deleteCity(city.id);
      loadCities();
    } catch (error) {
      console.error('Failed to delete city:', error);
    }
  };

  return (
    <div className="container">
      <h2 style={{ color: '#4CAF50' }}>World Cities</h2>
      <button className="btn btn-primary mb-3" style={{ backgroundColor: '#FFC107' }} onClick={addCity}>Add Cities</button>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cities.map(city => (
            <tr key={city.id}>
              <td>{city.id}</td>
              <td>{city.name}</td>
              <td>{city.lat}</td>
              <td>{city.lon}</td>
              <td>{city.country.name}</td>
              <td>
                <button className="btn btn-info mr-2" style={{ backgroundColor: '#17A2B8' }} onClick={() => editCity(city)}>Edit</button>
                <button className="btn btn-danger" style={{ backgroundColor: '#DC3545' }} onClick={() => deleteCity(city)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {newCountry && (
        <div>
          <h3 style={{ color: '#007BFF' }}>Create New Country with Cities</h3>
          <form onSubmit={saveCountryWithCities}>
            <input type="text" placeholder="Country Name" value={newCountry.name} onChange={e => setNewCountry({ ...newCountry, name: e.target.value })} />
            <input type="text" placeholder="ISO2" value={newCountry.iso2} onChange={e => setNewCountry({ ...newCountry, iso2: e.target.value })} />
            <input type="text" placeholder="ISO3" value={newCountry.iso3} onChange={e => setNewCountry({ ...newCountry, iso3: e.target.value })} />
            <h3 style={{ color: '#28A745' }}>Add City</h3>
            {newCities.map((city, index) => (
              <div key={index}>
                <input type="text" placeholder="City Name" value={city.name} onChange={e => handleCityChange(index, 'name', e.target.value)} />
                <input type="number" placeholder="Latitude" value={city.lat} onChange={e => handleCityChange(index, 'lat', Number(e.target.value))} />
                <input type="number" placeholder="Longitude" value={city.lon} onChange={e => handleCityChange(index, 'lon', Number(e.target.value))} />
              </div>
            ))}
            <button type="button" className="btn btn-success" style={{ backgroundColor: '#28A745' }} onClick={addNewCityField}>Add Another City</button>
           <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#007BFF', borderColor: '#007BFF' }}>Save Country with Cities</button>
           </form>
        </div>
      )}

      {editingCity && (
        <div>
          <h3 style={{ color: '#17A2B8' }}>Edit City</h3>
          <form onSubmit={saveEditCity}>
            <input type="text" value={editingCity.name} onChange={e => setEditingCity({ ...editingCity, name: e.target.value })} />
            <input type="number" value={editingCity.lat} onChange={e => setEditingCity({ ...editingCity, lat: Number(e.target.value) })} />
            <input type="number" value={editingCity.lon} onChange={e => setEditingCity({ ...editingCity, lon: Number(e.target.value) })} />
            <select value={editingCity.countryId} onChange={e => setEditingCity({ ...editingCity, countryId: Number(e.target.value) })}>
              {countries.map(country => (
                <option key={country.id} value={country.id}>{country.name}</option>
              ))}
            </select>
            <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#007BFF', borderColor: '#007BFF' }}>Save</button>
            <button type="button" className="btn btn-secondary" style={{ backgroundColor: '#6C757D', borderColor: '#6C757D' }} onClick={() => setEditingCity(null)}>Cancel</button>
          </form>
        </div>
      )}
      </div>
  );
};

export default CityList;
