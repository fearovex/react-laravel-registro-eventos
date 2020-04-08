use portal_oxohotel;

drop table if exists `styles_campania`;
CREATE TABLE `styles_campania` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_campania` int(10) unsigned NOT NULL,
  `width_logo_web` varchar(255) NOT NULL DEFAULT '400px',
  `margin_logo_web` varchar(255) NOT NULL DEFAULT '5%',
  `width_logo_movil` varchar(255) NOT NULL DEFAULT '250px',
  `margin_logo_movil` varchar(255) NOT NULL DEFAULT '5%',
  `container_form_color` varchar(255) NOT NULL DEFAULT '#005153ad',
  `container_form_font_color` varchar(255) NOT NULL DEFAULT '#EEE',
  `button_font_color` varchar(255) NOT NULL DEFAULT '#EEE',
  `button_background_color` varchar(255) NOT NULL DEFAULT '#20396f',
  `button_border_color` varchar(255) NOT NULL DEFAULT '#20396f',
  `button_hover_font_color` varchar(255) NOT NULL DEFAULT '#EEE',
  `button_hover_background_color` varchar(255) NOT NULL DEFAULT '#1a2b50',
  `checkbox_terms_background_color` varchar(255) NOT NULL DEFAULT '#20396f',
  `checkbox_terms_border_color` varchar(255) NOT NULL DEFAULT '#20396f',
  `msg_error_color_font` varchar(255) NOT NULL DEFAULT '#EEE',
  `msg_error_color_background` varchar(255) NOT NULL DEFAULT 'rgb(160,19,35,0.91)',
  PRIMARY KEY (`id`)
);

drop table if exists `terms_conditions_campania`;
CREATE TABLE `terms_conditions_campania` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_campania` int(10) unsigned NOT NULL,
  `terms_conditions_es` longtext  NOT NULL,
  `terms_conditions_en` longtext  NOT NULL,
  PRIMARY KEY (`id`)
);

use unicentro;

drop table if exists `styles_campania`;
CREATE TABLE `styles_campania` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_campania` int(10) unsigned NOT NULL,
  `width_logo_web` varchar(255) NOT NULL DEFAULT '200px',
  `margin_logo_web` varchar(255) NOT NULL DEFAULT '1px',
  `width_logo_movil` varchar(255) NOT NULL DEFAULT '120px',
  `margin_logo_movil` varchar(255) NOT NULL DEFAULT '1px',
  `container_form_color` varchar(255) NOT NULL DEFAULT '#005153ad',
  `container_form_font_color` varchar(255) NOT NULL DEFAULT '#EEE',
  `button_font_color` varchar(255) NOT NULL DEFAULT '#EEE',
  `button_background_color` varchar(255) NOT NULL DEFAULT '#20396f',
  `button_border_color` varchar(255) NOT NULL DEFAULT '#20396f',
  `button_hover_font_color` varchar(255) NOT NULL DEFAULT '#EEE',
  `button_hover_background_color` varchar(255) NOT NULL DEFAULT '#1a2b50',
  `checkbox_terms_background_color` varchar(255) NOT NULL DEFAULT '#20396f',
  `checkbox_terms_border_color` varchar(255) NOT NULL DEFAULT '#20396f',
  `msg_error_color_font` varchar(255) NOT NULL DEFAULT '#EEE',
  `msg_error_color_background` varchar(255) NOT NULL DEFAULT 'rgb(160,19,35,0.91)',
  PRIMARY KEY (`id`)
);

drop table if exists `terms_conditions_campania`;
CREATE TABLE `terms_conditions_campania` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_campania` int(10) unsigned NOT NULL,
 `terms_conditions_es`longtext NOT NULL,
  `terms_conditions_en` longtext  NOT NULL,
  PRIMARY KEY (`id`)
);



