-- Cafolio Database Schema
DROP TABLE IF EXISTS coffee;
DROP TABLE IF EXISTS dictionary;

CREATE TABLE dictionary (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type VARCHAR(50) NOT NULL,      -- 'method', 'temperature', 'ratio', 'grind'
    value VARCHAR(100) NOT NULL,    -- Display name (e.g., 'Aeropress', '93°C', '1:15', 'Medium')
    image_url TEXT,                 -- Optional image representing the option
    order_index INT DEFAULT 0,      -- For sorting options in the UI
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- MARCA (brand)
INSERT INTO dictionary (type, value, image_url) VALUES
('brand', 'Café la Gaitana', NULL),
('brand', 'Differente', NULL),
('brand', 'Hemisferio', NULL),
('brand', 'Purist', NULL);

-- VARIEDAD (variety)
INSERT INTO dictionary (type, value, image_url) VALUES
('variety', 'Bourbon', NULL),
('variety', 'Castillo', NULL),
('variety', 'Caturra', NULL),
('variety', 'Colombia', NULL),
('variety', 'Geisha', NULL),
('variety', 'Pacamara', NULL),
('variety', 'Papayo', NULL),
('variety', 'SL28', NULL),
('variety', 'Tabi', NULL),
('variety', 'Typica', NULL);

-- PROCESO (process)
INSERT INTO dictionary (type, value, image_url) VALUES
('process', 'Honey', NULL),
('process', 'Lavado', NULL),
('process', 'Natural', NULL),
('process', 'Semi-lavado', NULL);

-- MÉTODO (method)
INSERT INTO dictionary (type, value, image_url) VALUES
('method', 'Aeropress', NULL),
('method', 'Chemex', NULL),
('method', 'Clever Dripper', NULL),
('method', 'Cold Brew', NULL),
('method', 'Espresso', NULL),
('method', 'Moka Italiana', NULL),
('method', 'Prensa Francesa', NULL),
('method', 'V60', NULL);

-- TEMPERATURA (temperature)
INSERT INTO dictionary (type, value, image_url) VALUES
('temperature', '84', NULL),
('temperature', '86', NULL),
('temperature', '88', NULL),
('temperature', '90', NULL),
('temperature', '92', NULL),
('temperature', '94', NULL),
('temperature', '96', NULL);

-- RATIO (ratio)
INSERT INTO dictionary (type, value, image_url) VALUES
('ratio', '1:12', NULL),
('ratio', '1:13', NULL),
('ratio', '1:14', NULL),
('ratio', '1:15', NULL),
('ratio', '1:16', NULL),
('ratio', '1:17', NULL),
('ratio', '1:18', NULL);

-- MOLIENDA (grind)
INSERT INTO dictionary (type, value, image_url) VALUES
('grind', 'Extragruesa', NULL),
('grind', 'Gruesa', NULL),
('grind', 'Media', NULL),
('grind', 'Media-gruesa', NULL),
('grind', 'Media-fina', NULL),
('grind', 'Fina', NULL),
('grind', 'Extrafina', NULL);