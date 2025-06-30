import React from 'react';
import CompanyCard from './CompanyCard';

export default function CompanyGrid({ companies, onCompanyClick, onDeleteCompany, loading }) {
  if (loading) return <div>Laster...</div>;
  if (!companies || companies.length === 0) return <div className="col-span-full text-gray-500 text-center">Ingen kunder funnet</div>;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {companies.map((company) => (
        <CompanyCard 
          key={company.id} 
          name={company.name} 
          onClick={() => onCompanyClick(company)} 
          onDelete={() => onDeleteCompany(company)}
        />
      ))}
    </div>
  );
} 