import React from 'react';
import { useApp } from '../context/AppContext';
import { BANGLADESH_DIVISIONS, getDistrictsByDivision } from '../data/bangladeshLocations';
import { MapPin, Users, ArrowRight } from 'lucide-react';

export const DivisionExplorer: React.FC = () => {
  const { lang, t, quickFilterByDivision } = useApp();

  return (
    <section className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C62835] uppercase tracking-wider mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'সারা বাংলাদেশ' : 'Nationwide Coverage'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t('exploreDivisions')}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {lang === 'bn'
                ? 'বাংলাদেশের ৮টি প্রশাসনিক বিভাগের যেকোনো একটি নির্বাচন করে নিকটস্থ রক্তদাতা খুঁজুন'
                : 'Select any of Bangladesh’s 8 divisions to find voluntary blood donors in your area'}
            </p>
          </div>
        </div>

        {/* 8 Divisions Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {BANGLADESH_DIVISIONS.map((division) => {
            const districts = getDistrictsByDivision(division.id);
            return (
              <div
                key={division.id}
                onClick={() => quickFilterByDivision(division.id)}
                className="group p-4 sm:p-5 rounded-2xl bg-slate-50 hover:bg-rose-50/50 border border-slate-200 hover:border-rose-300 transition-all cursor-pointer shadow-2xs hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-8 h-8 rounded-xl bg-white border border-slate-200 group-hover:border-rose-200 flex items-center justify-center text-[#C62835] font-bold text-xs shadow-2xs">
                      {lang === 'bn' ? division.nameBn.slice(0, 1) : division.nameEn.slice(0, 1)}
                    </span>
                    <span className="text-[11px] font-medium text-slate-400 group-hover:text-rose-600 flex items-center gap-1">
                      {districts.length} {lang === 'bn' ? 'জেলা' : 'districts'}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#C62835] transition-colors">
                    {lang === 'bn' ? division.nameBn : division.nameEn}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {lang === 'bn' ? division.nameEn : division.nameBn}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-slate-600 group-hover:text-slate-900 font-medium tabular-nums">
                    <Users className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#C62835]" />
                    <span>{division.donorCount.toLocaleString()} {lang === 'bn' ? 'রক্তদাতা' : 'donors'}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#C62835] group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
