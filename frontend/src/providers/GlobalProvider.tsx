import { createContext, ReactNode, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { routerPaths } from '../const';

export const GlobalContext = createContext(null as any);

export function GlobalProvider({ children }: { children: ReactNode }) {
    let location = useLocation();
    let path = location.pathname;

    let initOpenId = '';
    const [openId, setOpenId] = useState(initOpenId);

    const [isAfterChanges, setIsAfterChanges] = useState(false);

    const [subjectData, setSubjectData] = useState<any>(null);
    const [coursesData, setCoursesData] = useState<any>(null);
    const [modulesData, setModulesData] = useState<any>(null);

    const handleSelectedData = (itemData: any) => {
        if (path === routerPaths.disciplines) {
            setSubjectData(itemData);
        }

        if (path === routerPaths.courses) {
            setCoursesData(itemData);
        }

        if (path === routerPaths.modules) {
            setModulesData(itemData);
        }
    };

    const resetSelectedData = () => {
        setSubjectData(null);
        setCoursesData(null);
        setModulesData(null);
    };

    const ctx = {
        subjectData,
        setSubjectData,
        coursesData,
        setCoursesData,
        modulesData,
        setModulesData,

        handleSelectedData,
        resetSelectedData,

        initOpenId,
        openId,
        setOpenId,

        isAfterChanges,
        setIsAfterChanges,

        currentOpenId: {
            [routerPaths.courses]: subjectData?.id || '',
            [routerPaths.modules]: coursesData?.id || '',
            [routerPaths.topics]: modulesData?.id || '',
        },
    };

    return <GlobalContext.Provider value={ctx}>{children}</GlobalContext.Provider>;
}

export function useGlobal() {
    return useContext(GlobalContext);
}
