"""
    Cylinder Geoemtry (with homogeneous distribution)

The Cylinder with heigh `h`, that goes from [-h/2, h/2], and Radius `R`
"""
function Atom(geometry::Cylinder, N::Int64, R::Union{Real,Integer}, h::Union{Real,Integer}; kwargs...)
    @debug "start: Shape - Cylinder"

    dimensions = 3
    ρ = N / (h * π * R^2)
    rₘᵢₙ = float(get(kwargs, :r_min, get_rₘᵢₙ(ρ)))

    createFunction = ftn_AtomsOnCylinder
    r = get_atoms(dimensions, N, rₘᵢₙ; createFunction, R, h)
    sizes = (R=Float64(R), h=Float64(h))

    @debug "end  : Shape - Cylinder"
    return Atom(Cylinder(), r, N, sizes)
end

function Atom(geometry::Cylinder, r::Matrix, R::Union{Real,Integer}, h::Union{Real,Integer})
    N = size(r, 2) # remember to use each collum as a atom position
    return Atom(Cylinder(), Float64.(r), N, (R=Float64(R), h=Float64(h)))
end

function ftn_AtomsOnCylinder(; kwargs...)
    R, h = kwargs[:R], kwargs[:h]

    # Thanks to chatGPT for 'r = R*sqrt(rand())' command
    r, θ = R * sqrt(rand()), 2π * rand()

    x = r * cos(θ)
    y = r * sin(θ)
    z = -h * rand() + h / 2

    return [x, y, z]
end
