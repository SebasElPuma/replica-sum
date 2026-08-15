window.FormBlocks = window.FormBlocks || {};
window.FormBlocks.familiaSalud = `
    <style>
        .family-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 20px;
            margin-top: 20px;
            margin-bottom: 30px;
        }

        .family-card {
            background: rgba(255, 255, 255, 0.9);
            border-radius: 16px;
            padding: 20px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
            transition: all 0.3s ease;
            position: relative;
            border: 1px solid rgba(0,0,0,0.05);
            backdrop-filter: blur(10px);
        }

        .family-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .family-card-header {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
        }

        .family-avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, #6e8efb, #a777e3);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 24px;
            margin-right: 15px;
        }

        .family-name {
            font-size: 1.1rem;
            font-weight: 600;
            color: #333;
            margin: 0;
            line-height: 1.2;
        }

        .family-relation {
            font-size: 0.85rem;
            color: #777;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .family-details {
            font-size: 0.9rem;
            color: #555;
            line-height: 1.6;
        }

        .family-details p {
            margin-bottom: 4px;
            display: flex;
            justify-content: space-between;
        }

        .family-details strong {
            color: #333;
        }

        .family-actions {
            position: absolute;
            top: 15px;
            right: 15px;
            display: flex;
            gap: 8px;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .family-card:hover .family-actions {
            opacity: 1;
        }

        .family-btn {
            background: white;
            border: none;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            color: #555;
            transition: all 0.2s ease;
        }

        .family-btn:hover {
            background: #f0f0f0;
        }

        .family-btn.delete:hover {
            color: #e74c3c;
            background: #fadbd8;
        }

        .family-btn.edit:hover {
            color: #3498db;
            background: #d6eaf8;
        }

        .family-card-add {
            border: 2px dashed #ccc;
            background: transparent;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: none;
            color: #888;
            min-height: 220px;
        }

        .family-card-add:hover {
            border-color: #6e8efb;
            color: #6e8efb;
            background: rgba(110, 142, 251, 0.05);
        }

        .family-card-add i {
            font-size: 40px;
            margin-bottom: 10px;
        }

        /* Modal Styles */
        .custom-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(5px);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }

        .custom-modal-overlay.active {
            opacity: 1;
            visibility: visible;
        }

        .custom-modal {
            background: white;
            border-radius: 20px;
            width: 90%;
            max-width: 600px;
            max-height: 90vh;
            overflow-y: auto;
            padding: 30px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            transform: translateY(20px);
            transition: all 0.3s ease;
        }

        .custom-modal-overlay.active .custom-modal {
            transform: translateY(0);
        }

        .custom-modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            border-bottom: 1px solid #eee;
            padding-bottom: 15px;
        }

        .custom-modal-header h2 {
            margin: 0;
            font-size: 1.5rem;
            color: #333;
        }

        .custom-modal-close {
            background: transparent;
            border: none;
            font-size: 24px;
            color: #888;
            cursor: pointer;
            transition: color 0.2s;
        }

        .custom-modal-close:hover {
            color: #333;
        }

        .custom-modal-footer {
            margin-top: 25px;
            display: flex;
            justify-content: flex-end;
            gap: 15px;
        }

        .btn-modern {
            padding: 10px 20px;
            border-radius: 8px;
            border: none;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
        }

        .btn-modern.cancel {
            background: #f1f1f1;
            color: #555;
        }

        .btn-modern.cancel:hover {
            background: #e4e4e4;
        }

        .btn-modern.save {
            background: linear-gradient(135deg, #6e8efb, #a777e3);
            color: white;
            box-shadow: 0 4px 10px rgba(110, 142, 251, 0.3);
        }

        .btn-modern.save:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 15px rgba(110, 142, 251, 0.4);
        }
    </style>

    <section>
        <div class="href-target" id="familiaSalud"></div>
        <h1>
            <i class="fa-regular fa-lightbulb"></i>Familia y Salud
        </h1>
        
        <div id="familia-grid" class="family-grid">
            <!-- Las tarjetas se inyectarán aquí -->
        </div>
    </section>

    <div id="familiaModal" class="custom-modal-overlay">
        <div class="custom-modal">
            <div class="custom-modal-header">
                <h2 id="modalFamiliaTitle">Añadir Familiar</h2>
                <button type="button" class="custom-modal-close" id="btnCerrarModalFamilia"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <form id="formFamiliaModal" class="form-horizontal">
                <input type="hidden" id="familiaIndex" value="-1">
                <div class="form-row">
                    <div class="nice-form-group form-group col-md-12">
                        <label>Nombre Completo</label>
                        <input type="text" class="form-control" id="famNombre" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="nice-form-group form-group col-md-6">
                        <label>Parentesco</label>
                        <select class="form-control" id="famParentesco" required>
                            <option value="">Seleccione</option>
                            <option value="Padre">Padre</option>
                            <option value="Madre">Madre</option>
                            <option value="Hermano(a)">Hermano(a)</option>
                            <option value="Hijo(a)">Hijo(a)</option>
                            <option value="Abuelo(a)">Abuelo(a)</option>
                            <option value="Tío(a)">Tío(a)</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </div>
                    <div class="nice-form-group form-group col-md-6">
                        <label>Edad</label>
                        <input type="text" class="form-control" id="famEdad" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="nice-form-group form-group col-md-6">
                        <label>Grado de Instrucción</label>
                        <select class="form-control" id="famGrado">
                            <option value="">Seleccione</option>
                            <option value="Sin Instrucción">Sin Instrucción</option>
                            <option value="Primaria">Primaria</option>
                            <option value="Secundaria">Secundaria</option>
                            <option value="Superior Técnico">Superior Técnico</option>
                            <option value="Universitario">Universitario</option>
                            <option value="Postgrado">Postgrado</option>
                        </select>
                    </div>
                    <div class="nice-form-group form-group col-md-6">
                        <label>Ocupación</label>
                        <input type="text" class="form-control" id="famOcupacion">
                    </div>
                </div>
                <div class="form-row">
                    <div class="nice-form-group form-group col-md-6">
                        <label>Condición Laboral</label>
                        <select class="form-control" id="famCondicion">
                            <option value="">Seleccione</option>
                            <option value="Estable">Estable</option>
                            <option value="Eventual">Eventual</option>
                            <option value="Independiente">Independiente</option>
                            <option value="Desempleado">Desempleado</option>
                            <option value="Estudiante">Estudiante</option>
                            <option value="Jubilado">Jubilado</option>
                            <option value="Ama de casa">Ama de casa</option>
                        </select>
                    </div>
                    <div class="nice-form-group form-group col-md-6">
                        <label>Aporte Económico (S/.)</label>
                        <input type="number" class="form-control" id="famAporte" min="0">
                    </div>
                </div>
                <div class="form-row">
                    <div class="nice-form-group form-group col-md-6">
                        <label>Enfermedad (Opcional)</label>
                        <input type="text" class="form-control" id="famEnfermedad">
                    </div>
                    <div class="nice-form-group form-group col-md-6">
                        <label>Discapacidad (Opcional)</label>
                        <input type="text" class="form-control" id="famDiscapacidad">
                    </div>
                </div>
                <div class="custom-modal-footer">
                    <button type="button" class="btn-modern cancel" id="btnCancelarModalFamilia">Cancelar</button>
                    <button type="submit" class="btn-modern save">Guardar</button>
                </div>
            </form>
        </div>
    </div>
`;

