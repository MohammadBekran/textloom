import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

export const useDocumentsFilter = () => {
  const [filters, setFilters] = useQueryStates({
    search: parseAsString.withDefault(""),
    take: parseAsInteger.withDefault(5),
  });

  return {
    filters,
    setFilters,
  };
};
