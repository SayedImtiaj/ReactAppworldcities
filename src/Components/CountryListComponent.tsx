import React, { useState, useEffect } from 'react';
import { CountryService } from '../Services/CountryService';
import { Country } from '../models/Country';

const CountryList: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [newCountry, setNewCountry] = useState<Country | null>(null);
  const [editingCountry, setEditingCountry] = useState<Country | null>(null);

  useEffect(() => {
    loadCountries();
  }, []);

  const loadCountries = async () => {
    const response = await CountryService.getCountries();
    setCountries(response.data.data);
  };

  const addCountry = () => {
    setNewCountry({ id: 0, name: '', iso2: '', iso3: '', totCities: 0 });
  };

  const saveCountry = async () => {
    if (newCountry) {
      await CountryService.postCountry(newCountry);
      loadCountries();
      setNewCountry(null);
    }
  };

  const editCountry = (country: Country) => {
    setEditingCountry(country);
  };

  const saveEditCountry = async () => {
    if (editingCountry) {
      await CountryService.updateCountry(editingCountry.id, editingCountry);
      loadCountries();
      setEditingCountry(null);
    }
  };

  const deleteCountry = async (country: Country) => {
    await CountryService.deleteCountry(country.id);
    loadCountries();
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 text-center">
          <h2 style={{ color: '#4CAF50' }}>Country List</h2>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <button className="btn btn-primary mb-3" style={{ backgroundColor: '#FFC107', borderColor: '#FFC107' }} onClick={addCountry}>Add Country</button>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>ISO2</th>
                <th>ISO3</th>
                <th>Total Cities</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {countries.map((country) => (
                <tr key={country.id}>
                  <td>{country.id}</td>
                  <td>{country && country.name}</td>
                  <td>{country && country.iso2}</td>
                  <td>{country && country.iso3}</td>
                  <td>{country && country.totCities}</td>
                  <td>
                    <button className="btn btn-info mr-2" style={{ backgroundColor: '#17A2B8', borderColor: '#17A2B8' }} onClick={() => editCountry(country)}>Edit</button>
                    <button className="btn btn-danger" style={{ backgroundColor: '#DC3545', borderColor: '#DC3545' }} onClick={() => deleteCountry(country)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {newCountry && (
        <div className="row">
          <div className="col">
            <h3 style={{ color: '#007BFF', textAlign: 'center' }}>Create New Country</h3>
            <form onSubmit={saveCountry}>
              <input type="text" placeholder="Name" onChange={e => setNewCountry({ ...newCountry, name: e.target.value })} />
              <input type="text" placeholder="ISO2" onChange={e => setNewCountry({ ...newCountry, iso2: e.target.value })} />
              <input type="text" placeholder="ISO3" onChange={e => setNewCountry({ ...newCountry, iso3: e.target.value })} />
              <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#007BFF', borderColor: '#007BFF' }}>Save</button>
            </form>
          </div>
        </div>
      )}

      {editingCountry && (
        <div className="row">
          <div className="col">
            <h3 style={{ color: '#17A2B8', textAlign: 'center' }}>Edit Country</h3>
            <form onSubmit={saveEditCountry}>
              <input type="text" value={editingCountry.name} onChange={e => setEditingCountry({ ...editingCountry, name: e.target.value })} />
              <input type="text" value={editingCountry.iso2} onChange={e => setEditingCountry({ ...editingCountry, iso2: e.target.value })} />
              <input type="text" value={editingCountry.iso3} onChange={e => setEditingCountry({ ...editingCountry, iso3: e.target.value })} />
              <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#007BFF', borderColor: '#007BFF' }}>Save</button>
              <button type="button" className="btn btn-secondary" style={{ backgroundColor: '#6C757D', borderColor: '#6C757D' }} onClick={() => setEditingCountry(null)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default CountryList;
