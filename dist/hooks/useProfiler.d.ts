declare const useProfiler: ({ name, prop }: {
    name?: string;
    prop?: string;
}) => () => void;
export default useProfiler;
