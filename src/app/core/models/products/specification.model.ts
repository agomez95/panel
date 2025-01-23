// Modelo para especificaciones constantes
export interface SpecificationConstant {
    id: number;
    name: string; // COLOR, SIZE, TEXT
}

// Modelo para especificaciones
export interface Specification {
    id: number;
    subcategoryId: number; // Relación con la subcategoría
    specificationConstantId: number; // Relación con la constante de especificación
    specificationConstantName: string; // Nombre de la constante (COLOR, SIZE, TEXT)
    createdAt: Date;
    updatedAt: Date;
}

// Modelo para crear especificaciones
export interface createSpecification {
    id: number;
    subcategoryId: number; // Relación con la subcategoría
    specificationConstantId: number; // Relación con la constante de especificación
}

// Modelo para subcategorías
export interface Subcategory {
    id: number;
    name: string;
    specifications: Specification[]; // Lista de especificaciones relacionadas
}
