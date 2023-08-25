# --------------------------------- GENERAL FUNCTIONS ---------------------------------
function time_evolution(problem::LinearOptics{T}, u₀, tspan::Tuple; ode_solver=true, kargs...) where {T<:Linear}

    tmin = tspan[1]
    tmax = tspan[2]

    ### if time is big, and laser is swithc-off, the 'FORMAL SOLUTION' of the ODE problem is much faster
    if problem.laser.s ≈ 0 && tmax ≥ 200 # 200 is an ad hoc value
        time_interval = get(kargs, :saveat, range(tmin, tmax, length=20))
        solution = formal_solution_laser_off(problem, u₀, time_interval)
        return solution
    elseif problem.laser.s ≈ 0 && ode_solver == false
        time_interval = get(kargs, :saveat, range(tmin, tmax, length=20))
        solution = formal_solution_laser_off(problem, u₀, time_interval)
        return solution
    elseif ode_solver == false
        time_interval = get(kargs, :saveat, range(tmin, tmax, length=20))
        useBigFloat = get(kargs, :useBigFloat, false)
        solution = formal_solution_laser_on(problem, u₀, time_interval; useBigFloat=useBigFloat)
        return solution
    end

    ### use default G and Ωₙ
    G = copy(interaction_matrix(problem))
    Ωₙ = laser_field(problem, problem.atoms.r)
    solution = time_evolution_ode_solver(problem, u₀, tspan, Ωₙ, G; kargs...)

    return solution
end

function time_evolution_ode_solver(problem::LinearOptics{T}, u₀, tspan::Tuple, Ωₙ::VecOrMat, G::Matrix; kargs...) where {T<:Linear}
    ### parameters == constant vector and matrices
    parameters = get_evolution_params(problem, G, Ωₙ)

    ### calls for solver
    problemFunction = get_evolution_function(problem)
    prob = ODEProblem(problemFunction, u₀, tspan, parameters)
    solution = OrdinaryDiffEq.solve(prob, VCABM3(); abstol=1e-9, kargs...)

    return solution
end


function ODE_LinearSystem!(du, u, p, t)
    G, Ωₙ = p

    #=
    Equivalent to:
        "du[:] = G*u + Ωₙ"
    But using inplace operation
    =#
    du .= muladd(G, u, Ωₙ)
    return nothing
end


function formal_solution_laser_on(
    problem,
    initial_state::AbstractVector,
    time_interval::AbstractVector;
    useBigFloat=false
)
    N = problem.atoms.N
    G = interaction_matrix(problem)
    Ωₙ = laser_field(problem, problem.atoms.r)

    Λ, P = eigen(G)
    Pinv = inv(P)
    Λinv = inv(Diagonal(Λ))
    PinvΩₙ = Pinv * vec(Ωₙ)

    if useBigFloat
        Λ = BigFloat.(real.(Λ)) + BigFloat.(imag.(Λ)) * im
        Pinv = BigFloat.(real.(Pinv)) + BigFloat.(imag.(Pinv)) * im
        Λinv = BigFloat.(real.(Λinv)) + BigFloat.(imag.(Λinv)) * im
        PinvΩₙ = BigFloat.(real.(PinvΩₙ)) + BigFloat.(imag.(PinvΩₙ)) * im
    end
    u = ThreadsX.map(time_interval) do t
        term1 = (P * Diagonal(exp.(+t * Λ)) * Pinv) * initial_state
        term2 = P * Diagonal(exp.(+t * Λ)) * (Λinv * (Diagonal(exp.(-t * Λ)) - I) * PinvΩₙ)
        term1 + term2
    end
    return (t=time_interval, u=u)
end

function formal_solution_laser_off(
    problem,
    initial_state::AbstractVector,
    time_interval::AbstractVector,
)
    G = interaction_matrix(problem)
    Λ, P = eigen(G)
    Pinv = inv(P)

    u = ThreadsX.map(time_interval) do t
        P * Diagonal(exp.(t * Λ)) * Pinv * initial_state
    end
    return (t=time_interval, u=u)
end

# --------------------------------- MODEL SPECIFIC ---------------------------------

## Scalar
get_evolution_function(problem::LinearOptics{Scalar}) = ODE_LinearSystem!
get_evolution_params(problem::LinearOptics{Scalar}, G, Ωₙ) = view(G, :, :), view(vec(Ωₙ), :)




## Vectorial
get_evolution_function(problem::LinearOptics{Vectorial}) = ODE_LinearSystem!
function get_evolution_params(problem::LinearOptics{Vectorial}, G, Ωₙ)
    Ωₙ_eff = _vecAux_Matrix_into_longArray(Ωₙ)
    return view(G, :, :), view(Ωₙ_eff, :)
end

# this function is executed when i compute the vectorial model
function formal_solution_laser_off(
    problem,
    initial_state::AbstractMatrix,
    time_interval::AbstractVector,
)
    initial_state_array = _vecAux_Matrix_into_longArray(initial_state)
    formal_solution_laser_off(problem, initial_state_array, time_interval)
end