import React, { useState, useEffect } from "react";
import { Button, TextField, Box, Typography, Card, Tabs, Tab } from "@mui/material";
import { AlignLeft, Layout, Phone, Wrench } from "lucide-react";
import axios from "axios"; // Asegúrate de que Axios esté importado

export default function Dashboard() {
  // Estados para Hero
  const [heroTitle, setHeroTitle] = useState("");
  const [heroDescription, setHeroDescription] = useState("");
  const [heroButtonText, setHeroButtonText] = useState("");
  const [heroImage, setHeroImage] = useState("");
  const [heroVision, setHeroVision] = useState("");
  const [heroMision, setHeroMision] = useState("");

  // Estados para Nosotros
  const [aboutTitle, setAboutTitle] = useState("");
  const [aboutText, setAboutText] = useState("");
  const [aboutImage, setAboutImage] = useState("");

  // Estados para Valores
  const [aboutValues, setAboutValues] = useState([
    { title: "", description: "" },  // Valor 1
    { title: "", description: "" },  // Valor 2
    { title: "", description: "" },  // Valor 3
    { title: "", description: "" },  // Valor 4
    { title: "", description: "" },  // Valor 5
    { title: "", description: "" },  // Valor 6
  ]);

  // Estados para Servicios
  const [servicesTitle, setServicesTitle] = useState("");
  const [servicesText, setServicesText] = useState("");
  const [services, setServices] = useState([
    {
      title: "",
      subtitles: [
        { subtitle: "", items: [""] },
      ],
    },
  ]);

  // Estados para Contactenos
  const [contactTitle, setContactTitle] = useState("");
  const [contactDescription, setContactDescription] = useState("");
  const [contactAddress, setContactAddress] = useState("");
  const [addressDescription, setAddressDescription] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [phoneDescription, setPhoneDescription] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [emailDescription, setEmailDescription] = useState("");
  const [mapIframe, setMapIframe] = useState("");
  const [socialTitle1, setSocialTitle1] = useState("");
  const [socialUrl1, setSocialUrl1] = useState("");
  const [socialTitle2, setSocialTitle2] = useState("");
  const [socialUrl2, setSocialUrl2] = useState("");
  const [socialTitle3, setSocialTitle3] = useState("");
  const [socialUrl3, setSocialUrl3] = useState("");

  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await axios.get('https://tekrea-backend-255659019198.us-central1.run.app/api/hero');
        const { title, description, buttonText, image, vision, mision } = response.data;
        setHeroTitle(title);
        setHeroDescription(description);
        setHeroButtonText(buttonText);
        setHeroImage(image);
        setHeroVision(vision); // Guardar Visión
        setHeroMision(mision); // Guardar Misión
      } catch (error) {
        console.error("Error al obtener los datos del Hero", error);
      }
    };


    const fetchAboutData = async () => {
      try {
        const response = await axios.get('https://tekrea-backend-255659019198.us-central1.run.app/api/about');
        if (response.data) {
          const { title, text, image } = response.data;
          setAboutTitle(title);
          setAboutText(text);
          setAboutImage(image);
        } else {
          console.warn("No se encontraron datos de Sobre Nosotros.");
        }
      } catch (error) {
        console.error("Error al obtener los datos de Sobre Nosotros", error);
      }
    };

    const fetchServicesData = async () => {
      try {
        const response = await axios.get('https://tekrea-backend-255659019198.us-central1.run.app/api/services');
        if (response.data) {
          const { servicesTitle, servicesText, services } = response.data;
          setServicesTitle(servicesTitle);
          setServicesText(servicesText);
          setServices(services);
        } else {
          console.warn("No se encontraron datos de Servicios.");
        }
      } catch (error) {
        console.error("Error al obtener los datos de Servicios", error);
      }
    };

    const fetchContactData = async () => {
      try {
        const response = await axios.get('https://tekrea-backend-255659019198.us-central1.run.app/api/contact');
        if (response.data) {
          const {
            contactTitle, contactDescription, contactAddress, addressDescription,
            contactPhone, phoneDescription, contactEmail, emailDescription,
            mapIframe, socialTitle1, socialUrl1, socialTitle2, socialUrl2, socialTitle3, socialUrl3
          } = response.data;

          setContactTitle(contactTitle);
          setContactDescription(contactDescription);
          setContactAddress(contactAddress);
          setAddressDescription(addressDescription);
          setContactPhone(contactPhone);
          setPhoneDescription(phoneDescription);
          setContactEmail(contactEmail);
          setEmailDescription(emailDescription);
          setMapIframe(mapIframe);
          setSocialTitle1(socialTitle1);
          setSocialUrl1(socialUrl1);
          setSocialTitle2(socialTitle2);
          setSocialUrl2(socialUrl2);
          setSocialTitle3(socialTitle3);
          setSocialUrl3(socialUrl3);
        } else {
          console.warn("No se encontraron datos de Contacto.");
        }
      } catch (error) {
        console.error("Error al obtener los datos de Contacto", error);
      }
    };

    fetchHeroData();
    fetchAboutData();
    fetchServicesData();
    fetchContactData();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleImageUpload = (event, setImage) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);  // Aquí almacenamos la imagen en base64
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveHero = async () => {
    try {
      await axios.post('https://tekrea-backend-255659019198.us-central1.run.app/api/hero/update', {
        title: heroTitle,
        description: heroDescription,
        buttonText: heroButtonText,
        image: heroImage,
        vision: heroVision,
        mision: heroMision,
      });
      alert("Datos del Hero actualizados correctamente");
    } catch (error) {
      console.error("Error al actualizar los datos del Hero", error);
    }
  };


  const handleSaveAbout = async () => {
    try {
      await axios.post('https://tekrea-backend-255659019198.us-central1.run.app/api/about/update', {
        title: aboutTitle,
        text: aboutText,
        image: aboutImage,  // Solo si se sube una nueva imagen
        values: aboutValues,  // Incluir los valores en la solicitud
      });
      alert("Datos de la sección Sobre Nosotros actualizados correctamente");
    } catch (error) {
      console.error("Error al actualizar los datos de Sobre Nosotros", error);
    }
  };

  const handleAboutValueChange = (index, field, value) => {
    const updatedValues = [...aboutValues];
    updatedValues[index][field] = value;
    setAboutValues(updatedValues);
  };

  const handleServiceChange = (index, field, value) => {
    const updatedServices = [...services];
    updatedServices[index][field] = value;
    setServices(updatedServices);
  };

  const handleSubtitleChange = (serviceIndex, subtitleIndex, field, value) => {
    const updatedServices = [...services];
    updatedServices[serviceIndex].subtitles[subtitleIndex][field] = value;
    setServices(updatedServices);
  };

  const handleItemChange = (serviceIndex, subtitleIndex, itemIndex, value) => {
    const updatedServices = [...services];
    updatedServices[serviceIndex].subtitles[subtitleIndex].items[itemIndex] = value;
    setServices(updatedServices);
  };

  const handleAddService = () => {
    setServices([...services, { title: "", subtitles: [{ subtitle: "", items: [""] }] }]);
  };

  const handleRemoveService = (index) => {
    const updatedServices = services.filter((_, i) => i !== index);
    setServices(updatedServices);
  };

  const handleAddSubtitle = (serviceIndex) => {
    const updatedServices = [...services];
    updatedServices[serviceIndex].subtitles.push({ subtitle: "", items: [""] });
    setServices(updatedServices);
  };

  const handleRemoveSubtitle = (serviceIndex, subtitleIndex) => {
    const updatedServices = [...services];
    updatedServices[serviceIndex].subtitles = updatedServices[serviceIndex].subtitles.filter((_, i) => i !== subtitleIndex);
    setServices(updatedServices);
  };

  const handleAddItem = (serviceIndex, subtitleIndex) => {
    const updatedServices = [...services];
    updatedServices[serviceIndex].subtitles[subtitleIndex].items.push("");
    setServices(updatedServices);
  };

  const handleRemoveItem = (serviceIndex, subtitleIndex, itemIndex) => {
    const updatedServices = [...services];
    updatedServices[serviceIndex].subtitles[subtitleIndex].items = updatedServices[serviceIndex].subtitles[subtitleIndex].items.filter((_, i) => i !== itemIndex);
    setServices(updatedServices);
  };

  const handleSaveServices = async () => {
    // Validar en el frontend que no haya subtítulos vacíos
    for (let service of services) {
      for (let subtitle of service.subtitles) {
        if (!subtitle.subtitle) {
          alert("El subtítulo no puede estar vacío.");
          return;
        }
      }
    }

    try {
      await axios.post("https://tekrea-backend-255659019198.us-central1.run.app/api/services/update", {
        servicesTitle,
        servicesText,
        services,
      });
      alert("Servicios actualizados correctamente");
    } catch (error) {
      console.error("Error al actualizar los servicios", error);
    }
  };


  const handleSaveContact = async () => {
    try {
      await axios.post('https://tekrea-backend-255659019198.us-central1.run.app/api/contact/update', {
        contactTitle, contactDescription, contactAddress, addressDescription,
        contactPhone, phoneDescription, contactEmail, emailDescription,
        mapIframe, socialTitle1, socialUrl1, socialTitle2, socialUrl2, socialTitle3, socialUrl3
      });
      alert("Datos de Contacto actualizados correctamente");
    } catch (error) {
      console.error("Error al actualizar los datos de Contacto", error);
    }
  };



  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard de Administración
      </Typography>

      <Tabs value={tabIndex} onChange={handleTabChange} aria-label="dashboard tabs">
        <Tab icon={<Layout />} label="Editar Hero" />
        <Tab icon={<AlignLeft />} label="Editar Sobre Nosotros" />
        <Tab icon={<Wrench />} label="Editar Servicios" />
        <Tab icon={<Phone />} label="Editar Contáctanos" />
      </Tabs>

      <Box sx={{ mt: 4 }}>
        {tabIndex === 0 && (
          <Card sx={{ padding: 3 }}>
            <Typography variant="h6">Editar Sección Hero</Typography>
            <TextField
              fullWidth
              label="Título"
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Descripción"
              value={heroDescription}
              onChange={(e) => setHeroDescription(e.target.value)}
              multiline
              rows={4}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Texto del Botón"
              value={heroButtonText}
              onChange={(e) => setHeroButtonText(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Visión"
              value={heroVision}
              onChange={(e) => setHeroVision(e.target.value)}
              multiline
              rows={3}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Misión"
              value={heroMision}
              onChange={(e) => setHeroMision(e.target.value)}
              multiline
              rows={3}
              sx={{ mb: 2 }}
            />
            <Box display="flex" alignItems="center" gap={2}>
              <TextField type="file" accept="image/*" onChange={handleImageUpload} />
              {heroImage && <img src={heroImage} alt="Hero Preview" style={{ width: 100, height: 100 }} />}
            </Box>
            <Button variant="contained" color="primary" onClick={handleSaveHero} sx={{ mt: 2 }}>
              Guardar Cambios
            </Button>
          </Card>
        )}

        {tabIndex === 1 && (
          <Card sx={{ padding: 3 }}>
            <Typography variant="h6">Editar Sección Sobre Nosotros</Typography>
            <TextField
              fullWidth
              label="Título"
              value={aboutTitle}
              onChange={(e) => setAboutTitle(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Texto"
              value={aboutText}
              onChange={(e) => setAboutText(e.target.value)}
              multiline
              rows={4}
              sx={{ mb: 2 }}
            />

            {/* Sección para Editar los Valores */}
            {aboutValues.map((value, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label={`Título del Valor ${index + 1}`}
                  value={value.title}
                  onChange={(e) => handleAboutValueChange(index, "title", e.target.value)}
                  sx={{ mb: 1 }}
                />
                <TextField
                  fullWidth
                  label={`Descripción del Valor ${index + 1}`}
                  value={value.description}
                  onChange={(e) => handleAboutValueChange(index, "description", e.target.value)}
                  multiline
                  rows={2}
                  sx={{ mb: 1 }}
                />
              </Box>
            ))}

            <Box display="flex" alignItems="center" gap={2}>
              <TextField
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, setAboutImage)}
              />
              {aboutImage && <img src={aboutImage} alt="About Preview" style={{ width: 100, height: 100 }} />}
            </Box>

            <Button variant="contained" color="primary" onClick={handleSaveAbout} sx={{ mt: 2 }}>
              Guardar Cambios
            </Button>
          </Card>
        )}


        {tabIndex === 2 && (
          <Card sx={{ padding: 3 }}>
            <Typography variant="h6">Editar Servicios</Typography>

            <TextField
              fullWidth
              label="Título de la Sección de Servicios"
              value={servicesTitle}
              onChange={(e) => setServicesTitle(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Texto Principal de la Sección"
              value={servicesText}
              onChange={(e) => setServicesText(e.target.value)}
              multiline
              rows={4}
              sx={{ mb: 2 }}
            />

            {Array.isArray(services) && services.map((service, serviceIndex) => (
              <Box key={serviceIndex} sx={{ mb: 4 }}>
                <Typography variant="h6">{`Servicio ${serviceIndex + 1}`}</Typography>

                <TextField
                  fullWidth
                  label={`Título del Servicio ${serviceIndex + 1}`}
                  value={service.title || ""}
                  onChange={(e) => handleServiceChange(serviceIndex, "title", e.target.value)}
                  sx={{ mb: 1 }}
                />

                {Array.isArray(service.subtitles) && service.subtitles.map((subtitle, subtitleIndex) => (
                  <Box key={subtitleIndex} sx={{ mb: 2, pl: 2 }}>
                    <TextField
                      fullWidth
                      label={`Subtítulo ${subtitleIndex + 1}`}
                      value={subtitle.subtitle || ""}
                      onChange={(e) => handleSubtitleChange(serviceIndex, subtitleIndex, "subtitle", e.target.value)}
                      sx={{ mb: 1 }}
                    />

                    {Array.isArray(subtitle.items) && subtitle.items.map((item, itemIndex) => (
                      <Box key={itemIndex} sx={{ pl: 4, mb: 1 }}>
                        <TextField
                          fullWidth
                          label={`Item ${itemIndex + 1}`}
                          value={item || ""}
                          onChange={(e) => handleItemChange(serviceIndex, subtitleIndex, itemIndex, e.target.value)}
                          sx={{ mb: 1 }}
                        />

                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleRemoveItem(serviceIndex, subtitleIndex, itemIndex)}
                        >
                          Eliminar Item
                        </Button>
                      </Box>
                    ))}

                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleAddItem(serviceIndex, subtitleIndex)}
                      sx={{ mt: 1 }}
                    >
                      Agregar Item
                    </Button>

                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleRemoveSubtitle(serviceIndex, subtitleIndex)}
                      sx={{ mt: 1, ml: 2 }}
                    >
                      Eliminar Subtítulo
                    </Button>
                  </Box>
                ))}

                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleAddSubtitle(serviceIndex)}
                  sx={{ mt: 2 }}
                >
                  Agregar Subtítulo
                </Button>

                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleRemoveService(serviceIndex)}
                  sx={{ mt: 2, ml: 2 }}
                >
                  Eliminar Servicio
                </Button>
              </Box>
            ))}

            <Button
              variant="outlined"
              color="primary"
              onClick={handleAddService}
              sx={{ mt: 2 }}
            >
              Agregar Servicio
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveServices}
              sx={{ mt: 2 }}
            >
              Guardar Cambios
            </Button>
          </Card>
        )}

        {tabIndex === 3 && (
          <Card sx={{ padding: 3 }}>
            <Typography variant="h6">Editar Información de Contacto</Typography>

            {/* Contact Title and Description */}
            <TextField
              fullWidth
              label="Título de Contacto"
              value={contactTitle}
              onChange={(e) => setContactTitle(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Descripción de Contacto"
              value={contactDescription}
              onChange={(e) => setContactDescription(e.target.value)}
              multiline
              rows={2}
              sx={{ mb: 2 }}
            />

            {/* Map Iframe */}
            <TextField
              fullWidth
              label="Iframe del Mapa"
              value={mapIframe}
              onChange={(e) => setMapIframe(e.target.value)}
              multiline
              rows={2}
              sx={{ mb: 2 }}
            />

            {/* Address and its Description */}
            <TextField
              fullWidth
              label="Dirección"
              value={contactAddress}
              onChange={(e) => setContactAddress(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Descripción de la Dirección"
              value={addressDescription}
              onChange={(e) => setAddressDescription(e.target.value)}
              multiline
              rows={2}
              sx={{ mb: 2 }}
            />

            {/* Phone and its Description */}
            <TextField
              fullWidth
              label="Teléfono"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Descripción del Teléfono"
              value={phoneDescription}
              onChange={(e) => setPhoneDescription(e.target.value)}
              multiline
              rows={2}
              sx={{ mb: 2 }}
            />

            {/* Email and its Description */}
            <TextField
              fullWidth
              label="Email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Descripción del Email"
              value={emailDescription}
              onChange={(e) => setEmailDescription(e.target.value)}
              multiline
              rows={2}
              sx={{ mb: 2 }}
            />

            {/* Social Media */}
            <Typography variant="h6">Redes Sociales</Typography>
            <TextField
              fullWidth
              label="Título de Red Social 1"
              value={socialTitle1}
              onChange={(e) => setSocialTitle1(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="URL de Red Social 1"
              value={socialUrl1}
              onChange={(e) => setSocialUrl1(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Título de Red Social 2"
              value={socialTitle2}
              onChange={(e) => setSocialTitle2(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="URL de Red Social 2"
              value={socialUrl2}
              onChange={(e) => setSocialUrl2(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Título de Red Social 3"
              value={socialTitle3}
              onChange={(e) => setSocialTitle3(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="URL de Red Social 3"
              value={socialUrl3}
              onChange={(e) => setSocialUrl3(e.target.value)}
              sx={{ mb: 2 }}
            />

            <Button variant="contained" color="primary" onClick={handleSaveContact}>
              Guardar Cambios
            </Button>
          </Card>
        )}
      </Box>
    </Box >
  );
}
