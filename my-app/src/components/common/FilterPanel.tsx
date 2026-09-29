import { useState } from 'react';
import './filter-panel.css';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterConfig {
  name: string;
  label: string;
  type: 'checkbox' | 'select';
  options: FilterOption[];
}

interface FilterPanelProps {
  filters: FilterConfig[];
  selectedFilters: Record<string, string[]>;
  onFilterChange: (filterName: string, values: string[]) => void;
  onReset: () => void;
}

export default function FilterPanel({
  filters,
  selectedFilters,
  onFilterChange,
  onReset,
}: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckboxChange = (filterName: string, value: string, checked: boolean) => {
    const current = selectedFilters[filterName] || [];
    const updated = checked
      ? [...current, value]
      : current.filter(v => v !== value);
    onFilterChange(filterName, updated);
  };

  const handleSelectChange = (filterName: string, value: string) => {
    onFilterChange(filterName, value ? [value] : []);
  };

  const activeFilterCount = Object.values(selectedFilters).reduce(
    (count, values) => count + values.length,
    0
  );

  return (
    <div className="filter-panel-wrapper">
      <button
        className="btn-filter"
        onClick={() => setIsOpen(!isOpen)}
        title="Open filters"
      >
        ⊞ Filter {activeFilterCount > 0 && <span className="filter-badge">{activeFilterCount}</span>}
      </button>

      {isOpen && (
        <div className="filter-panel-overlay" onClick={() => setIsOpen(false)}>
          <div className="filter-panel-content" onClick={e => e.stopPropagation()}>
            <div className="filter-panel-header">
              <h3>Filters</h3>
              <button
                className="filter-close"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="filter-panel-body">
              {filters.map(filter => (
                <div key={filter.name} className="filter-group">
                  <label className="filter-group-label">{filter.label}</label>

                  {filter.type === 'checkbox' && (
                    <div className="filter-checkboxes">
                      {filter.options.map(option => (
                        <label key={option.value} className="filter-checkbox-label">
                          <input
                            type="checkbox"
                            checked={(selectedFilters[filter.name] || []).includes(option.value)}
                            onChange={e =>
                              handleCheckboxChange(filter.name, option.value, e.target.checked)
                            }
                          />
                          <span>{option.label}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {filter.type === 'select' && (
                    <select
                      value={(selectedFilters[filter.name] || [])[0] || ''}
                      onChange={e => handleSelectChange(filter.name, e.target.value)}
                      className="filter-select"
                    >
                      <option value="">All {filter.label}</option>
                      {filter.options.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              ))}
            </div>

            <div className="filter-panel-footer">
              <button
                className="btn-reset-filters"
                onClick={() => {
                  onReset();
                  setIsOpen(false);
                }}
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
