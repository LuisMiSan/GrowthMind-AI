import React from 'react';
import type { BusinessArea } from '../types';
import { MegaphoneIcon } from './icons/MegaphoneIcon';
import { DollarSignIcon } from './icons/DollarSignIcon';
import { TruckIcon } from './icons/TruckIcon';
import { UsersIcon } from './icons/UsersIcon';
import { LandmarkIcon } from './icons/LandmarkIcon';
import { CodeIcon } from './icons/CodeIcon';
import { BriefcaseIcon } from './icons/BriefcaseIcon';
import { ShoppingCartIcon } from './icons/ShoppingCartIcon';
import { ThumbsUpIcon } from './icons/ThumbsUpIcon';
import { FileSearchIcon } from './icons/FileSearchIcon';
import { MousePointerClickIcon } from './icons/MousePointerClickIcon';
import { BarChartIcon } from './icons/BarChartIcon';

interface BusinessAreaDisplayProps {
    area: BusinessArea;
    className?: string;
}

const areaMap: Record<BusinessArea, { icon: React.FC<React.SVGProps<SVGSVGElement>>, label: string }> = {
    marketing: { icon: MegaphoneIcon, label: 'Marketing Digital' },
    sales: { icon: DollarSignIcon, label: 'Ventas' },
    logistics: { icon: TruckIcon, label: 'Logística' },
    hr: { icon: UsersIcon, label: 'Recursos Humanos' },
    finance: { icon: LandmarkIcon, label: 'Finanzas' },
    it: { icon: CodeIcon, label: 'TI' },
    general: { icon: BriefcaseIcon, label: 'General' },
    ecommerce: { icon: ShoppingCartIcon, label: 'E-commerce' },
    social_media: { icon: ThumbsUpIcon, label: 'Redes Sociales' },
    content: { icon: FileSearchIcon, label: 'Contenido y SEO' },
    ux_ui: { icon: MousePointerClickIcon, label: 'UX/UI' },
    data_analytics: { icon: BarChartIcon, label: 'Analítica de Datos' },
};

export const BusinessAreaDisplay: React.FC<BusinessAreaDisplayProps> = ({ area, className }) => {
    const { icon: IconComponent, label } = areaMap[area] || areaMap.general;

    return (
        <span className={`inline-flex items-center gap-1.5 ${className}`}>
            <IconComponent className="h-4 w-4 flex-shrink-0" />
            <span>{label}</span>
        </span>
    );
};