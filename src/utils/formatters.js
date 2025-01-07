export const formatJPData = (data, type) => {
  switch (type) {
    case 'peopleGroups':
      return data.map(group => ({
        name: group.PeopNameInCountry,
        population: group.Population,
        religion: group.PrimaryReligion,
        isUnreached: group.IsUnreached,
        countryName: group.CountryName
      }));
      
    case 'languages':
      return data.map(lang => ({
        name: lang.LanguageName,
        population: lang.Population,
        bibleStatus: lang.BibleStatus,
        countryName: lang.PrimaryCountryName
      }));
      
    case 'countries':
      return data.map(country => ({
        name: country.CountryName,
        population: country.Population,
        peopleGroups: country.PeopleGroups,
        percentUnreached: country.PercentUnreached
      }));
      
    default:
      return data;
  }
}; 