-- Cafolio Database Schema
DROP TABLE IF EXISTS coffees;
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

-- COFFEES TABLE
CREATE TABLE coffees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id varchar(100) NOT NULL,                    -- FK to users table
    brand_dictionary_id UUID NOT NULL,        -- FK to dictionary (type = 'brand')
    variety_dictionary_id UUID NOT NULL,      -- FK to dictionary (type = 'variety')
    process_dictionary_id UUID NOT NULL,      -- FK to dictionary (type = 'process')
    photo_path TEXT NOT NULL,                 -- local image path
    region VARCHAR(100),                      -- optional
    farm VARCHAR(100),                        -- optional
    price NUMERIC(10,2),                      -- optional, price in local currency
    notes TEXT,                               -- optional
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT fk_brand_dictionary
        FOREIGN KEY (brand_dictionary_id) REFERENCES dictionary(id),
    CONSTRAINT fk_variety_dictionary
        FOREIGN KEY (variety_dictionary_id) REFERENCES dictionary(id),
    CONSTRAINT fk_process_dictionary
        FOREIGN KEY (process_dictionary_id) REFERENCES dictionary(id)
);

-- SAMPLE COFFEE DATA
INSERT INTO coffees (
    id,
    user_id,
    brand_dictionary_id,
    variety_dictionary_id,
    process_dictionary_id,
    photo_path,
    region,
    farm,
    price,
    notes
) VALUES (
    gen_random_uuid(),
    'fram07@gmail',
    (SELECT id FROM dictionary WHERE type = 'brand' AND value = 'Hemisferio'),
    (SELECT id FROM dictionary WHERE type = 'variety' AND value = 'Geisha'),
    (SELECT id FROM dictionary WHERE type = 'process' AND value = 'Natural'),
    '/ruta/local/imagen.jpg',
    'Huila',
    'Finca La Esperanza',
    55000,
    'Notas a frutos amarillos y miel.'
);

DROP TABLE coffee_preparations;
 CREATE TABLE coffee_preparations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id varchar(100) NOT NULL,                    -- FK to users tabl
    coffee_id UUID NOT NULL,                    -- FK to coffees table
    method_dictionary_id UUID NOT NULL,         -- FK to dictionary (type = 'method')
    temperature_dictionary_id UUID NOT NULL,    -- FK to dictionary (type = 'temperature')
    ratio_dictionary_id UUID NOT NULL,          -- FK to dictionary (type = 'ratio')
    ranking NUMERIC(2,1) NOT NULL,               -- Ranking from 0.0 to 5.0
    notes JSONB,                                -- JSON array of words (e.g., ['fruity', 'sweet'])
    comments TEXT,                              -- Text field for additional comments
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),

    CONSTRAINT fk_coffee
        FOREIGN KEY (coffee_id) REFERENCES coffees(id),
    CONSTRAINT fk_method_dictionary
        FOREIGN KEY (method_dictionary_id) REFERENCES dictionary(id),
    CONSTRAINT fk_temperature_dictionary
        FOREIGN KEY (temperature_dictionary_id) REFERENCES dictionary(id),
    CONSTRAINT fk_ratio_dictionary
        FOREIGN KEY (ratio_dictionary_id) REFERENCES dictionary(id)
);