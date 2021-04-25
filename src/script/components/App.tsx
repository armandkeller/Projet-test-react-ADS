import * as React from 'react';
import { useState } from 'react';
import dataFromJson from '../../data/coverage.json';
import logo from "../../images/logo.png"


export const App: React.FC = () => {
  const [entries, setEntries ] = useState(dataFromJson);

  const handleClick = (data: any[]): void => {
    if(!data[0] || !data[1]) return; // on sort de la fonction si on clique sur les cellules marque de véhicule
    const { coverage } = entries;
    if(coverage[data[0]].indexOf(data[1]) === -1) {
      coverage[data[0]].push(data[1]); // ajout de la disponibilité
    } else {
      const index = coverage[data[0]].indexOf(data[1])
      coverage[data[0]].splice(index,1); // retrait de la disponibilité
    }
    setEntries({...entries});
  }
  
  const renderYears = (): JSX.Element[] => {
    const { years } = entries;
    const acura = <img src={logo} alt="acura brand image" title="acura brand image" width="200" height="200"></img>
    const copyYears: any[] = [acura, ...years]; // On fait une copie du array years pour y insérer le logo
    return copyYears.map((value: JSX.Element | number, key: number) => {
      if(key === 0)
        return <th key={key} className="picture">{value}</th>
      return <th key={key}><span>{value}</span></th>
    }
     );
  };
  const renderVehicule = (): JSX.Element[] => {
    const { years, coverage, "vehicle-models": vehicleModels } = entries;
    const copyYears: any[] = [null, ...years]; // On y ajoute un nouvel index afin d'enligner les cellules avec l'année et la marque
    return vehicleModels.map((car: string, i: number) => 
      <tr key={i}>
          {
            copyYears.map((year: number, j: number) => {
              let isAvailable: boolean = coverage[car] && coverage[car].indexOf(year) > -1;
              return <td key={j} className={isAvailable ? "available" : "noavailable" } onClick={() => handleClick([vehicleModels[i], year])}>{j === 0 ? car : null}</td>
            })
          }
      </tr>
    );
  };
  return (
    <table>
      <thead>
        <tr>
          {renderYears()}
        </tr>
      </thead>
      <tbody>
        {renderVehicule()}
      </tbody>
    </table>
  )
}